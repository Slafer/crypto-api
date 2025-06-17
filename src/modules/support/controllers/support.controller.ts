import { Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

@ControllerRest('support')
export class SupportController {
    @Post('manual-parse-by-block')
    @ApiOperation({ summary: 'Manually parse block' })
    @ApiResponse({ status: 201, description: 'Block parsed manually.' })
    manualParseByBlock(@Body() body: any): void {}

    @Post('parse-tx')
    @ApiOperation({ summary: 'Parse transaction' })
    @ApiResponse({ status: 201, description: 'Transaction parsed.' })
    parseTransaction(@Body() body: any): void {}
}
