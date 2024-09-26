import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { buildDataSourceOptions } from './database.provider'
import { UserModule } from './system/user/user.module'
import {validationSchema} from "./env.validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema
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
export class AppModule {
}
