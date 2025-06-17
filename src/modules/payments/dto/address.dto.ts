import { String } from '@venom/decorators/guard.decorator'

export class AddressDto {
    @String()
    readonly foreignId: string

    @String()
    readonly segment: string

    @String()
    readonly currency: string
}
