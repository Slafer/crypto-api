import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { SegmentService } from '@venom/modules/payments/services/segment.service'

@Injectable()
export class SegmentGuard implements CanActivate {
    constructor(private readonly service: SegmentService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()

            const payload = request.body?.segment ? request.body.segment : request.query.segment

            if (!payload) {
                throw new BadRequestException('Segment required.')
            }

            const segment = await this.service.getSegment(payload)

            if (!segment) {
                throw new BadRequestException('Segment not found.')
            }

            return true
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }
}
