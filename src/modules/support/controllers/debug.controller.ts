import { Post, Query, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { DebugQueryDto } from '@venom/modules/support/dto/debug.dto'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

@ControllerRest('debug')
export class DebugController {
    @Post('block')
    @ApiOperation({ summary: 'Debug block' })
    @ApiQuery({
        name: 'kind',
        type: String,
        description: 'Kind of block, e.g., BTC',
        required: true,
    })
    @ApiQuery({
        name: 'block',
        type: String,
        description: 'Block identifier',
        required: true,
    })
    @ApiResponse({ status: 201, description: 'Block debug performed successfully.' })
    debugBlock(@Query() query: DebugQueryDto, @Body() body: any): void {}

    @Post('normalize-transactions')
    @ApiOperation({ summary: 'Normalize transactions' })
    @ApiQuery({
        name: 'kind',
        type: String,
        description: 'Type of transactions, e.g., BTC',
        required: true,
    })
    @ApiResponse({ status: 201, description: 'Transactions normalized.' })
    normalizeTransactions(@Query() query: DebugQueryDto, @Body() body: any): void {}

    @Post('find-intersected-transactions')
    @ApiOperation({ summary: 'Find intersected transactions' })
    @ApiQuery({
        name: 'kind',
        type: String,
        description: 'Type of transactions, e.g., TRC20',
        required: true,
    })
    @ApiResponse({ status: 201, description: 'Intersected transactions found.' })
    findIntersectedTransactions(@Query() query: DebugQueryDto, @Body() body: any): void {}
}
