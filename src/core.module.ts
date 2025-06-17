import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HealthModule } from '@venom/health/health.module'
import { MetricsModule } from '@venom/metrics/metrics.module'

import { PaymentsModule } from '@venom/modules/payments/payments.module'
import { SupportModule } from '@venom/modules/support/support.module'
import { DatabaseModule } from '@venom/database/database.module'
import { DatabaseConfigModule } from '@venom/modules/config/config.module'

@Global()
@Module({
    imports: [
        HealthModule,
        MetricsModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseConfigModule,
        DatabaseModule,
        PaymentsModule,
        SupportModule,
    ],
    exports: [DatabaseConfigModule],
})
export class CoreModule {}
