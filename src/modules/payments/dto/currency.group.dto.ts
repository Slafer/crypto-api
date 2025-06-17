import { String } from '@venom/decorators/guard.decorator'

export class CurrencyGroupDto {
    @String()
    readonly name: string
}
