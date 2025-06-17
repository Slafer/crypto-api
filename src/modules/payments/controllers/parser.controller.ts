import { Post, Body, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ControllerRest } from '@venom/decorators/rest.controller.decorator'

import { CurrencyGuard } from '@venom/modules/payments/guards/currency.guard'
import { ParserService } from '@venom/modules/payments/services/parser.service'
import { BlockParsingDto } from '@venom/modules/payments/dto/block.parsing.dto'

@ControllerRest('admin')
export class ParserController {
    constructor(private readonly service: ParserService) {}

    @Post('manual-parse')
    @UseGuards(CurrencyGuard)
    @ApiOperation({ summary: 'Process parsing blocks' })
    @ApiResponse({ status: 201, description: 'Process parsing blocks processed successfully.' })
    async parsing(@Body() dto: BlockParsingDto): Promise<boolean> {
        return this.service.parsing(dto)
    }
}
