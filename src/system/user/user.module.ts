import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './controllers/user.controller'
import { Session } from './entity/session.entity'
import { User } from './entity/user.entity'
import { UserService } from './services/user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Session]), JwtModule],
    providers: [UserService, ConfigModule],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
