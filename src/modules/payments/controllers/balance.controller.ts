import { Get, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

import { CurrencyGuard } from '@venom/modules/payments/guards/currency.guard'
import { SegmentGuard } from '@venom/modules/payments/guards/segment.guard'
import { BalanceService } from '@venom/modules/payments/services/balance.service'

import { BalanceByCurrencyDto } from '@venom/modules/payments/dto/balance.currency.dto'
import { BalanceWalletContract } from '@venom/modules/payments/contracts/balance.wallet.contract'

@ControllerRest('admin')
export class BalanceController {
    constructor(private readonly service: BalanceService) {}

    @Get('balance-by-currency')
    @ApiOperation({ summary: 'Getting a balance node by currency' })
    @ApiQuery({ name: 'currency', type: String, description: 'Currency code, for example, BTC', required: true })
    @UseGuards(SegmentGuard, CurrencyGuard)
    @ApiResponse({ status: 200, description: 'The result is successfully received.' })
    async getBalanceByCurrency(@Query() dto: BalanceByCurrencyDto): Promise<BalanceWalletContract.Payload> {
        return this.service.getWalletBalance(dto)
    }
}
