import { Injectable } from '@nestjs/common'

import { CurrencyRepository } from '@venom/modules/payments/repositories/currency.repository'

import { Currency } from '@venom/modules/payments/models/currency.model'
import { CurrencySymbolDto } from '@venom/modules/payments/dto/currency.symbol.dto'

@Injectable()
export class CurrencyService {
    constructor(private readonly repository: CurrencyRepository) {}

    // @Cacheable({ key: 'currencies', ttl: 60 })
    async getCurrencies(dto: CurrencySymbolDto): Promise<Currency[]> {
        return this.repository.findBySymbols(dto.currencies)
    }
}
