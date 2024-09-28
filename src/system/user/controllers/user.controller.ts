import { Body, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserAuthType } from '../../../_helpers/decorators/reqests.helpers'
import { UserDockGetOne, UserDockPost, UserDockPut } from '../../../_helpers/swagger/user.swagger.helper'
import { UserDecorator } from '../decorators/user.decorator'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserAuthDto } from '../dto/user-auth.dto'
import { Session } from '../entity/session.entity'
import { User } from '../entity/user.entity'
import { UserService } from '../services/user.service'

@Controller('user')
@ApiTags('User (Юзер)')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UserDockPost('authenticate', UserAuthType.NOT_AUTH, UserAuthDto, Session)
    async authenticate(@Body() dto: UserAuthDto) {
        return this.userService.authenticate(dto)
    }

    @UserDockPost('register', UserAuthType.NOT_AUTH, CreateUserDto, Session)
    async register(@Body() dto: CreateUserDto) {
        return this.userService.register(dto)
    }

    @UserDockGetOne('', UserAuthType.USER, User)
    async get(@UserDecorator() user: User) {
        return user
    }

    @UserDockPut('', UserAuthType.USER, UpdateUserDto)
    async update(@UserDecorator() user: User, @Body() dto: UpdateUserDto) {
        return this.userService.update(user, dto)
    }
}
