import * as process from 'process'
import * as dotenv from 'dotenv'

process.env.APP_TIMEZONE = process.env.APP_TIMEZONE || 'UTC'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { CoreModule } from '@venom/core.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ValidationPipe } from '@nestjs/common'
import { SignatureGuard } from '@venom/guards/signature.guard'
import { LoggingInterceptor } from '@venom/interceptors/logging.interceptor'
import { Configuration } from '@venom/configuration'
import { ConfigService } from '@nestjs/config'

async function bootstrap(): Promise<void> {
    const PORT = Number(Configuration.PORT)
    const app = await NestFactory.create(CoreModule)
    const service = app.get(ConfigService)

    const config = new DocumentBuilder().setTitle('Gateway API').setDescription('Central API gateway for interacting with microservices').setVersion('1.0').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    app.useGlobalGuards(new SignatureGuard(service))
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalInterceptors(new LoggingInterceptor())

    await app.listen(PORT)
}

void bootstrap()
