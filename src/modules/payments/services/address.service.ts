import { BadGatewayException, Logger, Inject, Injectable } from '@nestjs/common'
import { ClientRMQ } from '@nestjs/microservices'
import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'

import { firstValueFrom, retry, timeout } from 'rxjs'
import { AddressContract } from '@venom/modules/payments/contracts/address.contract'
import { AddressDto } from '@venom/modules/payments/dto/address.dto'
import { AddressesRepository } from '@venom/modules/payments/repositories/addresses.repository'

@Injectable()
export class AddressService {
    private readonly logger = new Logger(AddressService.name)

    constructor(
        @Inject(ClientMessage.Name)
        private readonly client: ClientRMQ,
        private readonly repository: AddressesRepository
    ) {}

    async getProviderAddress(dto: AddressDto): Promise<AddressContract.Response> {
        const address = await this.repository.findOne(dto)

        if (address) {
            return {
                foreignId: address.foreignId,
                segment: address.segment,
                currency: address.currency,
                address: address.address,
            }
        }

        this.logger.log(`Address ${dto.currency}: Requesting address from provider...`)
        const payload = await firstValueFrom(this.client.send<AddressContract.Payload>(`${AddressContract.Topic}.${dto.currency}`, dto).pipe(timeout(300_000), retry(10))).catch(
            console.error
        )

        if (!payload) {
            throw new BadGatewayException({ message: 'Provider is unavailable' })
        }

        await this.repository.create({
            address: payload.address,
            fingerprint: payload.fingerprint,
            currency: dto.currency,
            group: payload.group,
            path: payload.path,
            foreignId: dto.foreignId,
            segment: dto.segment,
        })

        return {
            foreignId: payload.foreignId,
            segment: payload.segment,
            currency: payload.currency,
            address: payload.address,
        }
    }
}
