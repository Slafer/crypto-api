import { Module } from '@nestjs/common'

import { services } from '@venom/modules/config/providers/core.provider'
import { repositories } from '@venom/modules/config/providers/repository.provider'

@Module({
    imports: [],
    providers: [...services, ...repositories],
    exports: [...services, ...repositories],
})
export class DatabaseConfigModule {}
