import { Get, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

@ControllerRest('admin')
export class AdminTransactionsController {
    constructor() {}

    @Get('deposit')
    @ApiOperation({ summary: 'Getting deposit information' })
    @ApiResponse({ status: 200, description: 'Deposit info retrieved successfully.' })
    getDeposit(): void {}

    @Get('withdrawal')
    @ApiOperation({ summary: 'Getting withdrawal information' })
    @ApiResponse({ status: 200, description: 'Withdrawal info retrieved successfully.' })
    getWithdrawal(): void {}

    @Post('missed-btc')
    @ApiOperation({ summary: 'Process missed BTC transactions' })
    @ApiResponse({ status: 201, description: 'Missed BTC processed.' })
    processMissedBtc(@Body() body: any): void {}

    @Post('missed-deposit')
    @ApiOperation({ summary: 'Process missed deposit transactions' })
    @ApiResponse({ status: 201, description: 'Missed deposit processed.' })
    processMissedDeposit(@Body() body: any): void {}

    @Post('dump-by-token-address')
    @ApiOperation({ summary: 'Dump by token address' })
    @ApiResponse({ status: 201, description: 'Dump by token address performed.' })
    dumpByTokenAddress(@Body() body: any): void {}

    @Post('replace-transaction')
    @ApiOperation({ summary: 'Replace transaction' })
    @ApiResponse({ status: 201, description: 'Transaction replaced.' })
    replaceTransaction(@Body() body: any): void {}

    @Post('final-block')
    @ApiOperation({ summary: 'Finalize block' })
    @ApiResponse({ status: 201, description: 'Block finalized.' })
    finalBlock(@Body() body: any): void {}

    @Post('final-batch')
    @ApiOperation({ summary: 'Finalize batch' })
    @ApiResponse({ status: 201, description: 'Batch finalized.' })
    finalBatch(@Body() body: any): void {}

    @Post('manual-deposit')
    @ApiOperation({ summary: 'Process manual deposit' })
    @ApiResponse({ status: 201, description: 'Manual deposit processed.' })
    manualDeposit(@Body() body: any): void {}
}
