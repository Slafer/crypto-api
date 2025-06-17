import { OptionalBoolean, String, OptionalNumber } from '@venom/decorators/guard.decorator'

export class CurrencyCreateDto {
    @String()
    readonly name: string

    @String()
    readonly symbol: string

    @String()
    readonly group: string

    @OptionalBoolean()
    readonly active?: boolean

    @OptionalNumber()
    readonly price?: number

    @OptionalNumber()
    readonly min?: number

    @OptionalNumber()
    readonly max?: number
}
