import { Module } from '@nestjs/common'
import { HealthController } from '@venom/health/health.controller'
import { TerminusModule } from '@nestjs/terminus'

@Module({
    imports: [TerminusModule],
    controllers: [HealthController],
})
export class HealthModule {}
