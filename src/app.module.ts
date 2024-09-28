import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { buildDataSourceOptions } from './database.provider'
import { validationSchema } from './env.validation'
import { UserModule } from './system/user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: buildDataSourceOptions,
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
