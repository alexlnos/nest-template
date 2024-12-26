import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { UserService } from '../services/user.service'
import { ErrorCodeEnum } from '@common/enums/validator/error.code.enum'
import { ErrorDto } from '@common/errors/error.dto'

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization

        if (token) {
            const session = await this.userService.findSessionByToken(token.replace('Bearer ', ''))
            if (!session) throw new ErrorDto(ErrorCodeEnum.UNAUTHORIZED)

            request.session = session
            request.user = session.user

            return true
        } else {
            return false
        }
    }
}
