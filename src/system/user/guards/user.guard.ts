import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { UserService } from '../services/user.service'

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization

        if (token) {
            const session = await this.userService.findSessionByToken(token.replace('Bearer ', ''))
            if (!session) return false

            request.session = session
            request.user = session.user

            return true
        } else {
            return false
        }
    }
}
