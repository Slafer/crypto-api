import { ClientRMQ } from '@nestjs/microservices'
import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'

import { NotificationContract, NotificationChannelEnum } from 'venom-core'
import { WithdrawalRepository } from '@venom/modules/payments/repositories/withdrawal.repository'
import { Withdrawal } from '@venom/modules/payments/models/withdrawal.model'

import { WithdrawalListDto } from '@venom/modules/payments/dto/withdrawal.list.dto'
import { DumpDto } from '@venom/modules/payments/dto/dump.dto'
import { DumpContract } from '@venom/modules/payments/contracts/dump.contract'
import { ListContract } from '@venom/modules/payments/contracts/list.contract'
import { retry } from 'rxjs/operators'
import { timeout } from 'rxjs/operators'

@Injectable()
export class WithdrawalService {
    private readonly logger = new Logger(WithdrawalService.name)

    constructor(
        @Inject(ClientMessage.Name)
        private readonly client: ClientRMQ,
        private readonly repository: WithdrawalRepository
    ) {}

    async createWithdrawalTransaction(dto: WithdrawalListDto): Promise<Withdrawal[]> {
        try {
            const transactions = await this.repository.bulkCreate(dto.payload)

            this.client.emit<NotificationContract.Payload>(NotificationContract.Topic, {
                text: `Created ${transactions.length} withdrawals`,
                channel: NotificationChannelEnum.Withdrawal,
            })

            return transactions
        } catch (e) {
            this.client.emit<NotificationContract.Payload>(NotificationContract.Topic, { text: e.message, channel: NotificationChannelEnum.Withdrawal })
            throw new BadRequestException(e.message)
        }
    }

    async dumpAsset(dto: DumpDto): Promise<void> {
        this.logger.log(`${DumpContract.Topic}.${dto.currency.toLowerCase()}`)
        await this.client.send<DumpContract.Payload>(`${DumpContract.Topic}.${dto.currency.toLowerCase()}`, dto).pipe(timeout(300_000), retry(10)).toPromise()
    }

    async getActionsList(currency: string): Promise<any> {
        this.logger.log(`${ListContract.Topic}.${currency.toLowerCase()}`)
        const result = await this.client.send<ListContract.Payload>(`${ListContract.Topic}.${currency.toLowerCase()}`, { currency }).pipe(timeout(300_000), retry(10)).toPromise()

        this.logger.log(result)
        return result
    }
}
