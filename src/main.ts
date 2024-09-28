import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { config } from 'dotenv'

import { AppModule } from './app.module'

async function bootstrap() {
    config()
    const app = await NestFactory.create(AppModule, { cors: true, bodyParser: true })
    app.setGlobalPrefix('api')
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            whitelist: true,
        })
    )
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    const configSwagger = new DocumentBuilder()
        .setTitle('Example API')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup('api-docs', app, document)

    await app.listen(3000)
}

bootstrap()
