import { Post, Body, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

import { WithdrawalService } from '@venom/modules/payments/services/withdrawal.service'
import { InsufficientFundsGuard } from '@venom/modules/payments/guards/insufficient.funds.guard'
import { CurrencyGuard } from '@venom/modules/payments/guards/currency.guard'

import { Withdrawal } from '@venom/modules/payments/models/withdrawal.model'
import { WithdrawalListDto } from '@venom/modules/payments/dto/withdrawal.list.dto'
import { AddressDumpDto } from '@venom/modules/payments/dto/address.dump.dto'

@ControllerRest('withdrawal')
export class PaymentController {
    constructor(private readonly service: WithdrawalService) {}

    @Post('crypto-multi')
    @UseGuards(CurrencyGuard, InsufficientFundsGuard)
    @ApiOperation({ summary: 'Process crypto multi-withdrawal' })
    @ApiResponse({ status: 201, description: 'Crypto multi-withdrawal processed successfully.' })
    async withdrawal(@Body() dto: WithdrawalListDto): Promise<Withdrawal[]> {
        return this.service.createWithdrawalTransaction(dto)
    }

    @Post('dump-by-token-address')
    @ApiOperation({ summary: 'Dump by token address' })
    @ApiResponse({ status: 201, description: 'Dump by token address performed.' })
    async dumpByTokenAddress(@Body() dto: AddressDumpDto): Promise<void> {
        //  return this.service.dumpByAddress(dto)
    }
}
