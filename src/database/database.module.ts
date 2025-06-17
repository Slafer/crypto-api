import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as path from 'node:path'

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (service: ConfigService) => ({
                type: 'postgres',
                schema: 'public',
                namingStrategy: new SnakeNamingStrategy(),
                applicationName: `venom-${service.get<string>('APP_NAME')}`,
                host: service.get<string>('DATABASE_HOST'),
                port: service.get<number>('DATABASE_PORT'),
                username: service.get<string>('DATABASE_USER'),
                password: service.get<string>('DATABASE_PASSWORD'),
                database: service.get<string>('DATABASE_NAME'),
                entities: [path.resolve(__dirname, '../modules/**/*.model.{ts,js}')],
                migrations: [path.join(__dirname, '../database/migrations/*.{ts,js}')],
                logging: true,
                migrationsRun: true
            }),
        }),
    ],
})
export class DatabaseModule {}
