import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ErrorCodeEnum } from '@common/enums/validator/error.code.enum'
import { ErrorDto } from '@common/errors/error.dto'
import { RoleHierarchy, RolesEnum } from '../enum/roles.enum'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<RolesEnum>('role', context.getHandler())
        if (!requiredRole) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if (!user || !user.role) {
            throw new ErrorDto(ErrorCodeEnum.FORBIDDEN)
        }

        const userRoleLevel = RoleHierarchy[user.role]
        const requiredRoleLevel = RoleHierarchy[requiredRole]

        if (userRoleLevel < requiredRoleLevel) {
            throw new ErrorDto(ErrorCodeEnum.FORBIDDEN)
        }

        return true
    }
}
