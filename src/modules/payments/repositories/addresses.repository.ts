import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { AddressDto } from '@venom/modules/payments/dto/address.dto'
import { Address } from '@venom/modules/payments/models/address.model'

interface Repository<T = Address> {
    create(entity: T): Promise<void>
    update(entity: T): Promise<void>
}

@Injectable()
export class AddressesRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async create(dto: Partial<Address>): Promise<void> {
        await this.manager.insert(Address, dto)
    }

    async update(dto: Partial<Address>): Promise<void> {
        await this.manager.update(Address, dto.id, dto)
    }

    async findOne(dto: AddressDto): Promise<Address | null> {
        return this.manager.findOne(Address, { where: { foreignId: dto.foreignId, segment: dto.segment, currency: dto.currency } })
    }
}
