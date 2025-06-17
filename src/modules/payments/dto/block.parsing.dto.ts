import { NumberArray, String } from '@venom/decorators/guard.decorator'

export class BlockParsingDto {
    @NumberArray()
    readonly blocks: number[]

    @String()
    readonly currency: string
}
