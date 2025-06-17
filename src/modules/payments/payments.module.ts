import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { ClientMessage } from '@venom/modules/payments/providers/client.message.provider'

import { controllers } from '@venom/modules/payments/providers/controller.provider'

import { services } from '@venom/modules/payments/providers/core.provider'
import { repositories } from '@venom/modules/payments/providers/repository.provider'

@Module({
    imports: [ClientsModule.register([ClientMessage.Options])],
    controllers: [...controllers],
    providers: [...services, ...repositories],
})
export class PaymentsModule {}
