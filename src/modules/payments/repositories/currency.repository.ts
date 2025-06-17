import { EntityManager, In } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'

import { Currency } from '@venom/modules/payments/models/currency.model'
import { CurrencyCreateDto } from '@venom/modules/payments/dto/currency.create.dto'
import { CurrencyUpdateDto } from '@venom/modules/payments/dto/currency.update.dto'

interface Repository<T = Currency> {
    create(dto: T): Promise<T>
    update(dto: T): Promise<T>
    delete(id: number): Promise<void>
    findAll(): Promise<T[]>
    findById(id: number): Promise<T | null>
    findBySymbol(symbol: string): Promise<T | null>
    findBySymbols(symbols: string[]): Promise<T[]>
}

@Injectable()
export class CurrencyRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async create(dto: CurrencyCreateDto): Promise<Currency> {
        return this.manager.create(Currency, dto)
    }

    async findAll(): Promise<Currency[]> {
        return this.manager.find(Currency)
    }

    async findById(id: number): Promise<Currency | null> {
        return this.manager.findOne(Currency, { where: { id } })
    }

    async findBySymbol(symbol: string): Promise<Currency | null> {
        return this.manager.findOne(Currency, { where: { symbol } })
    }

    async findBySymbols(symbols: string[]): Promise<Currency[]> {
        return this.manager.find(Currency, { where: { symbol: In(symbols) } })
    }

    async update(dto: CurrencyUpdateDto): Promise<Currency> {
        const currency = await this.findById(dto.id)

        if (!currency) {
            throw new NotFoundException(`Currency with id ${dto.id} not found`)
        }

        return this.manager.save(Currency, dto)
    }

    async delete(id: number): Promise<void> {
        const currency = await this.findById(id)

        if (!currency) {
            throw new NotFoundException(`Currency with id ${id} not found`)
        }

        await this.manager.delete(Currency, id)
    }
}
