import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common'
import { firstValueFrom, retry, timeout } from 'rxjs'
import { Big } from 'big.js'

import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'
import { ClientRMQ } from '@nestjs/microservices'

import { AddressGuardContract } from '@venom/modules/payments/contracts/address.guard.contract'

@Injectable()
export class InsufficientFundsGuard implements CanActivate {
    private readonly logger = new Logger(InsufficientFundsGuard.name)

    constructor(
        @Inject(ClientMessage.Name)
        private readonly client: ClientRMQ
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const { payload, currencies } = request.body

            if (!Array.isArray(payload) || !payload.length) {
                throw new BadRequestException('Withdrawals payload required.')
            }

            for (const withdrawal of payload) {
                const currency = currencies.find(c => c.symbol === withdrawal.currency)
                const requirement = new Big(withdrawal.amount).lte(currency.min)

                if (requirement) {
                    throw new BadRequestException(`Minimum withdrawal amount for ${withdrawal.currency} is ${currency.min}`)
                }

                const address = await firstValueFrom(
                    this.client
                        .send<boolean, AddressGuardContract.Payload>(`${AddressGuardContract.Topic}.${withdrawal.currency}`, { address: withdrawal.address })
                        .pipe(timeout(300_000), retry(10))
                ).catch(this.logger.error)

                if (!address) {
                    throw new BadRequestException(`Invalid withdrawal address: ${withdrawal.address}`)
                }
            }

            return true
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }
}
