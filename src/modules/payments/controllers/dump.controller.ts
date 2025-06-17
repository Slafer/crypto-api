import { Post, Body, UseGuards, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

import { WithdrawalService } from '@venom/modules/payments/services/withdrawal.service'
import { CurrencyGuard } from '@venom/modules/payments/guards/currency.guard'

import { DumpDto } from '@venom/modules/payments/dto/dump.dto'
import { Big } from 'big.js'

@ControllerRest('admin/money-dumper')
export class DumpController {
    constructor(private readonly service: WithdrawalService) {}

    @Post('dump')
    @ApiOperation({ summary: 'Dump asset' })
    @ApiResponse({ status: 201, description: 'Asset dumped successfully.' })
    @UseGuards(CurrencyGuard)
    async dumpAsset(@Body() dto: DumpDto): Promise<void> {
        return this.service.dumpAsset(dto)
    }

    @Get('/list')
    @ApiOperation({ summary: 'Get crypto actions inputs' })
    @ApiResponse({ status: 200, description: 'Crypto actions inputs retrieved successfully.' })
    @UseGuards(CurrencyGuard)
    async list(@Query('currency') currency): Promise<any> {
        const list = await this.service.getActionsList(currency)

        const sum = list.reduce((acc, cur) => {
            return new Big(acc).add(cur.value)
        }, new Big(0))

        return {
            list,
            sum,
        }
    }
}
