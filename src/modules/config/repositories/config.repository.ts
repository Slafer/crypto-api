import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { Config } from '@venom/modules/config/models/config.model'

interface Repository<T = Config> {
    create(entity: T): Promise<void>
    update(entity: T): Promise<void>
}

@Injectable()
export class ConfigRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async create(dto: Config): Promise<void> {
        await this.manager.insert(Config, dto)
    }

    async update(dto: Partial<Config>): Promise<void> {
        await this.manager.update(Config, dto.key, dto)
    }

    async findByKey(key: string): Promise<Config | null> {
        return this.manager.findOne(Config, { where: { key } })
    }

    async save(dto: Config): Promise<Config> {
        return this.manager.save(Config, dto)
    }
}
