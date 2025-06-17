import { OptionalNumber, String } from '@venom/decorators/guard.decorator'

export class AddressDumpDto {
    @String()
    readonly address: string

    @String()
    readonly nonce: number

    @String()
    readonly currency: string

    @OptionalNumber()
    readonly commission?: number
}
