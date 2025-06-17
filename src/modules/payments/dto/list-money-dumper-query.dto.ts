import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ListMoneyDumperQueryDto {
    @ApiProperty({
        description: 'Currency code, e.g. BTC',
        example: 'BTC',
    })
    @IsString()
    readonly currency: string
}
