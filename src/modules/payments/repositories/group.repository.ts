import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { Group } from '@venom/modules/payments/models/currency.group.model'
import { CurrencyGroupDto } from '@venom/modules/payments/dto/currency.group.dto'

interface Repository<T = Group> {
    create(dto: T): Promise<T>
    update(dto: T): Promise<T>
    delete(name: string): Promise<void>
}

@Injectable()
export class GroupRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async create(dto: CurrencyGroupDto): Promise<Group> {
        return this.manager.create(Group, dto)
    }

    async update(dto: CurrencyGroupDto): Promise<Group> {
        const group = await this.manager.findOne(Group, { where: { name: dto.name } })

        if (!group) {
            throw new NotFoundException(`Group with name ${dto.name} not found`)
        }

        return this.manager.save(Group, dto)
    }

    async delete(name: string): Promise<void> {
        const group = await this.manager.findOne(Group, { where: { name } })

        if (!group) {
            throw new NotFoundException(`Group with name ${name} not found`)
        }

        await this.manager.delete(Group, name)
    }
}
