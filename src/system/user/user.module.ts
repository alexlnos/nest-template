import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './controllers/user.controller'
import { Session } from './entity/session.entity'
import { User } from './entity/user.entity'
import { UserService } from './services/user.service'
import { UserAdminController } from './controllers/user.admin.controller'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Session]), JwtModule],
    providers: [UserService, ConfigModule],
    controllers: [UserController, UserAdminController],
    exports: [UserService],
})
export class UserModule {}
