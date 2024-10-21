import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppPrismaService } from './app.prisma.service'
import { validationSchema } from './env.validation'
import { UserModule } from './system/user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
        }),
        UserModule,
    ],
    controllers: [],
    providers: [AppPrismaService],
})
export class AppModule {}
