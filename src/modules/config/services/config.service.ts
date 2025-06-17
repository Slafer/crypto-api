import { Injectable } from '@nestjs/common'

import { ConfigRepository } from '@venom/modules/config/repositories/config.repository'
import { Config } from '@venom/modules/config/models/config.model'

@Injectable()
export class ConfigService {
    constructor(protected readonly repository: ConfigRepository) {}

    public async getNumberByKey(key: string): Promise<number> {
        const result = await this.getValueByKey(key)
        return Number(result)
    }

    public async getStringByKey(key: string): Promise<string> {
        return this.getValueByKey(key)
    }

    public async getBooleanByKey(key: string): Promise<boolean> {
        const result = await this.getValueByKey(key)
        return result === '1'
    }

    public async getObjectByKey(key: string): Promise<object> {
        return JSON.parse(await this.getValueByKey(key))
    }

    protected async getValueByKey(key: string): Promise<string> {
        const result = await this.repository.findByKey(key)

        if (!result || !result.value) {
            throw new Error(`Please setup configuration "${key}"`)
        }

        return result.value
    }

    protected async setValueByKey(key: string, value: string): Promise<Config> {
        let config = await this.repository.findByKey(key)

        if (config) {
            config.value = value
        }

        return this.repository.save(config!)
    }
}
