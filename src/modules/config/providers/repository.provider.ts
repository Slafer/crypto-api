import { Provider } from '@nestjs/common'
import { ConfigRepository } from '@venom/modules/config/repositories/config.repository'

export const repositories: Provider[] = [ConfigRepository]
