import { Number, String } from '@venom/decorators/guard.decorator'

export class WithdrawalDto {
    @Number()
    readonly amount: number

    @String()
    readonly foreignId: string

    @String()
    readonly currency: string

    @String()
    readonly address: string

    @String()
    readonly requestId: string
}
