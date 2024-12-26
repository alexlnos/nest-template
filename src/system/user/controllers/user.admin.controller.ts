import { Body, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserAuthType } from '@common/decorators/auth.helpers'
import { UserDockGetOne, UserDockPost, UserDockPut } from '@common/swagger/user.swagger.helper'
import { UserDecorator } from '../decorators/user.decorator'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserAuthDto } from '../dto/user-auth.dto'
import { Session } from '../entity/session.entity'
import { User } from '../entity/user.entity'
import { UserService } from '../services/user.service'

@Controller('admin/user')
@ApiTags('User admin')
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @UserDockPost('authenticate', UserAuthType.NOT_AUTH, UserAuthDto, Session)
    async authenticate(@Body() dto: UserAuthDto) {
        return this.userService.authenticate(dto, true)
    }

    @UserDockGetOne('', UserAuthType.MODERATOR, User)
    async get(@UserDecorator() user: User) {
        return user
    }

    @UserDockPut('', UserAuthType.MODERATOR, UpdateUserDto)
    async update(@UserDecorator() user: User, @Body() dto: UpdateUserDto) {
        return this.userService.update(user, dto)
    }
}
