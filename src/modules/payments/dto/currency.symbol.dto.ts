import { StringArray } from '@venom/decorators/guard.decorator'

export class CurrencySymbolDto {
    @StringArray()
    readonly currencies: string[]
}
