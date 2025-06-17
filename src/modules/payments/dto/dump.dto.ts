import { String, OptionalNumber } from '@venom/decorators/guard.decorator'

export class DumpDto {
    @String()
    readonly currency: string

    @OptionalNumber()
    readonly commission?: number
}
