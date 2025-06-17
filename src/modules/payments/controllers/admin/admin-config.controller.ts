import { Get } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

@ControllerRest('admin')
export class AdminConfigController {
    @Get('config')
    @ApiOperation({ summary: 'Get admin configuration' })
    @ApiResponse({ status: 200, description: 'Configuration retrieved successfully.' })
    getConfig(): void {}

    @Get('users')
    @ApiOperation({ summary: 'Get list of users' })
    @ApiResponse({ status: 200, description: 'User list retrieved successfully.' })
    getUsers(): void {}
}
