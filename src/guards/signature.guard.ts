import { Request } from 'express'
import { createHmac } from 'crypto'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SignatureGuard implements CanActivate {
    constructor(private readonly config: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>()

        if (!['POST', 'PUT', 'DELETE'].includes(request.method)) {
            return true
        }

        const signature = request.headers['x-signature']
        const timestamp = request.headers['x-timestamp']

        if (!timestamp) {
            throw new UnauthorizedException('No timestamp')
        }

        if (!signature) {
            throw new UnauthorizedException('No signature')
        }

        const requestTime = new Date(timestamp as string)

        if (isNaN(requestTime.getTime())) {
            throw new UnauthorizedException('Invalid timestamp format')
        }

        const now = new Date()
        const requirement = Math.abs(now.getTime() - requestTime.getTime()) > 30 * 1000

        if (requirement) {
            throw new UnauthorizedException('Request is outdated')
        }

        const hash = createHmac('sha256', this.config.get('SECRET_KEY_DEV') || '')
            .update(JSON.stringify(request.body) + timestamp)
            .digest('hex')

        if (hash !== signature) {
            throw new UnauthorizedException('Invalid signature')
        }

        return true
    }
}
