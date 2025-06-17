import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Segment } from '@venom/modules/payments/models/segment.model'

interface Repository<T = Segment> {
    findByName(name: string): Promise<T>
    delete(name: string): Promise<void>
}

@Injectable()
export class SegmentRepository implements Repository {
    constructor(
        @InjectEntityManager()
        private readonly manager: EntityManager
    ) {}

    async findByName(name: string): Promise<Segment> {
        const segment = await this.manager.findOne(Segment, { where: { name } })

        if (!segment) {
            throw new NotFoundException(`Segment with name ${name} not found`)
        }

        return segment
    }

    async delete(name: string): Promise<void> {
        const segment = await this.manager.findOne(Segment, { where: { name } })

        if (!segment) {
            throw new NotFoundException(`Segment with name ${name} not found`)
        }

        await this.manager.delete(Segment, name)
    }
}
