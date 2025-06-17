import { OptionalString, OptionalBoolean, Int, OptionalNumber } from '@venom/decorators/guard.decorator'

export class CurrencyUpdateDto {
    @Int()
    readonly id: number

    @OptionalString()
    readonly name?: string

    @OptionalBoolean()
    readonly active?: boolean

    @OptionalString()
    readonly symbol?: string

    @OptionalNumber()
    readonly price?: number

    @OptionalNumber()
    readonly min?: number

    @OptionalNumber()
    readonly max?: number
}
