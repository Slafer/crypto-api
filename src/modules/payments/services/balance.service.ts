import { ClientRMQ } from '@nestjs/microservices'
import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'
import { BadGatewayException, Inject, Injectable } from '@nestjs/common'

import { firstValueFrom, retry, timeout } from 'rxjs'
import { BalanceByCurrencyDto } from '@venom/modules/payments/dto/balance.currency.dto'
import { BalanceWalletContract } from '@venom/modules/payments/contracts/balance.wallet.contract'

@Injectable()
export class BalanceService {
    constructor(
        @Inject(ClientMessage.Name)
        private readonly client: ClientRMQ
    ) {}

    async getWalletBalance(dto: BalanceByCurrencyDto): Promise<BalanceWalletContract.Payload> {
        const payload = await firstValueFrom(
            this.client
                .send<BalanceWalletContract.Payload>(`${BalanceWalletContract.Topic}.${dto.currency}`, {
                    segment: dto.segment,
                })
                .pipe(timeout(300_000), retry(10))
        ).catch(console.error)

        if (!payload) {
            throw new BadGatewayException({ message: 'Provider is unavailable' })
        }

        return payload
    }
}
