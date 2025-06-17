import { BadGatewayException, Inject, Injectable } from '@nestjs/common'
import { ClientRMQ } from '@nestjs/microservices'
import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'

import { firstValueFrom, retry, timeout } from 'rxjs'
import { BlockParsingDto } from '@venom/modules/payments/dto/block.parsing.dto'
import { ParsingContract } from '@venom/modules/payments/contracts/parsing.contract'

@Injectable()
export class ParserService {
    constructor(
        @Inject(ClientMessage.Name)
        private readonly client: ClientRMQ
    ) {}

    async parsing(dto: BlockParsingDto): Promise<boolean> {
        const payload = await firstValueFrom(this.client.send<ParsingContract.Payload>(`${ParsingContract.Topic}.${dto.currency}`, dto).pipe(timeout(300_000), retry(10))).catch(
            console.error
        )

        if (!payload) {
            throw new BadGatewayException({ message: `Parser ${dto.currency} is unavailable` })
        }

        return true
    }
}
