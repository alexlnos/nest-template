import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { AppPrismaService } from '../../app.prisma.service'

@Module({
    imports: [JwtModule],
    providers: [UserService, ConfigModule, AppPrismaService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
