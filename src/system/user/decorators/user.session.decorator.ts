import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const UserSessionDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.session
})
