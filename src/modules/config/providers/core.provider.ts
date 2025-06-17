import { Provider } from '@nestjs/common'
import { ConfigService } from '@venom/modules/config/services/config.service'

export const services: Provider[] = [ConfigService]
