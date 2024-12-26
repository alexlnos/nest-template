import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { UserGuard } from '../../src/system/user/guards/user.guard'
import { Roles } from '../../src/system/user/decorators/role.decorator'
import { RoleGuard } from '../../src/system/user/guards/role.guard'
import { RolesEnum } from '../../src/system/user/enum/roles.enum'

export enum UserAuthType {
    NOT_AUTH = 'NOT_AUTH',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

const validateUserAuthMap = {
    [UserAuthType.NOT_AUTH]: {
        fn: () => [],
    },
    [UserAuthType.USER]: {
        fn: () => [UseGuards(UserGuard, RoleGuard), Roles(RolesEnum.USER), ApiBearerAuth()],
    },
    [UserAuthType.MODERATOR]: {
        fn: () => [UseGuards(UserGuard, RoleGuard), Roles(RolesEnum.MODERATOR), ApiBearerAuth()],
    },
    [UserAuthType.ADMIN]: {
        fn: () => [UseGuards(UserGuard, RoleGuard), Roles(RolesEnum.ADMIN), ApiBearerAuth()],
    },
}

export function UserAuth(type: UserAuthType) {
    const { fn } = validateUserAuthMap[type]

    return applyDecorators(...fn())
}
