import { String } from '@venom/decorators/guard.decorator'

export class BalanceByCurrencyDto {
    @String({ description: 'Currency code, for example, BTC', example: 'BTC' })
    readonly currency: string

    @String({ description: 'Segment name, for example, green', example: 'green' })
    readonly segment: string
}
