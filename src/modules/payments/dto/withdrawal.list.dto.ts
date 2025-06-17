import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator'
import { WithdrawalDto } from '@venom/modules/payments/dto/withdrawal.dto'

export class WithdrawalListDto {
    @ApiProperty({ type: [WithdrawalDto] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WithdrawalDto)
    readonly payload: WithdrawalDto[]
}
