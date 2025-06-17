import { Injectable } from '@nestjs/common'

import { SegmentRepository } from '@venom/modules/payments/repositories/segment.repository'

import { Segment } from '@venom/modules/payments/models/segment.model'

@Injectable()
export class SegmentService {
    constructor(private readonly repository: SegmentRepository) {}

    async getSegment(name: string): Promise<Segment> {
        return this.repository.findByName(name)
    }
}
