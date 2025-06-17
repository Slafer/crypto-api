import { DataSource } from 'typeorm'
import { Configuration } from '@venom/configuration'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as path from 'node:path'

export const options: PostgresConnectionOptions = {
    type: 'postgres',
    applicationName: Configuration.NAME,
    schema: 'public',
    namingStrategy: new SnakeNamingStrategy(),
    dropSchema: false,
    logging: ['error', 'migration'],
    url: Configuration.DATABASE_URL,
    entities: [path.resolve(__dirname, '../modules/**/*.model.{ts,js}')],
    migrations: [path.join(__dirname, '../database/migrations/*.{ts,js}')],
    migrationsRun: true,
    extra: {
        max: 10,
    },
}

export const source = new DataSource(options)
