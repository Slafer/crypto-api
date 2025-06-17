import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DebugQueryDto {
    @ApiProperty({
        description: 'Kind of block, e.g., BTC',
        example: 'BTC',
    })
    @IsString()
    @IsNotEmpty()
    readonly kind: string

    @ApiProperty({
        description: 'Block identifier',
        example: '1234567890',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    readonly block?: number
}
