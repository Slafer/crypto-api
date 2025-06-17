import { Post, Body } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

@ControllerRest('admin')
export class AdminBlockchainController {
    @Post('solana-address-prepare')
    @ApiOperation({ summary: 'Prepare Solana address' })
    @ApiResponse({ status: 201, description: 'Solana address prepared successfully.' })
    prepareSolanaAddress(@Body() body: any): void {}

    @Post('xrp-trust-line')
    @ApiOperation({ summary: 'Setup XRP trust line' })
    @ApiResponse({ status: 201, description: 'XRP trust line setup successfully.' })
    setupXrpTrustLine(@Body() body: any): void {}
}
