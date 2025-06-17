import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { Withdrawal } from '@venom/modules/payments/models/withdrawal.model'
import { WithdrawalDto } from '@venom/modules/payments/dto/withdrawal.dto'

interface Repository<T = Withdrawal> {
    create(entity: T): Promise<void>
    update(entity: T): Promise<void>
    bulkCreate(dto: WithdrawalDto[]): Promise<T[]>
}

@Injectable()
export class WithdrawalRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async create(dto: Withdrawal): Promise<void> {
        await this.manager.insert(Withdrawal, dto)
    }

    async update(dto: Partial<Withdrawal>): Promise<void> {
        await this.manager.update(Withdrawal, dto.id, dto)
    }

    async bulkCreate(dto: WithdrawalDto[]): Promise<Withdrawal[]> {
        return this.manager.save(Withdrawal, dto)
    }
}
