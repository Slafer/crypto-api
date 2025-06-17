import { Module } from '@nestjs/common'
import { controllers } from '@venom/modules/support/providers/controller.provider'

@Module({
    controllers: [...controllers],
})
export class SupportModule {}
