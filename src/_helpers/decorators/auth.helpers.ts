import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { UserGuard } from '../../system/user/guards/user.guard'

export enum UserAuthType {
    USER,
    NOT_AUTH,
}

const validateUserAuthMap = {
    [UserAuthType.NOT_AUTH]: {
        fn: () => [],
    },
    [UserAuthType.USER]: {
        fn: () => [UseGuards(UserGuard), ApiBearerAuth()],
    },
}

export function UserAuth(type: UserAuthType) {
    const { fn } = validateUserAuthMap[type]

    return applyDecorators(...fn())
}
