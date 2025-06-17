import { ControllerRest } from '@venom/decorators/rest.controller.decorator'
import { Post, Body, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { AddressContract } from '@venom/modules/payments/contracts/address.contract'
import { AddressDto } from '@venom/modules/payments/dto/address.dto'

import { CurrencyGuard } from '@venom/modules/payments/guards/currency.guard'
import { SegmentGuard } from '@venom/modules/payments/guards/segment.guard'
import { AddressService } from '@venom/modules/payments/services/address.service'

@ControllerRest('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    @Post('take')
    @ApiOperation({ summary: 'Take address endpoint' })
    @ApiResponse({ status: 201, description: 'Address taken successfully.' })
    @UseGuards(CurrencyGuard, SegmentGuard)
    async getAddress(@Body() dto: AddressDto): Promise<AddressContract.Response> {
        return this.service.getProviderAddress(dto)
    }
}
