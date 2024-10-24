import { Delete, Get, Post, Put, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { ApiOkPaginatedResponse, ApiPaginationQuery, PaginateConfig } from 'nestjs-paginate'

import { UserAuth, UserAuthType } from '../decorators/auth.helpers'
import { ErrorDto } from '../errors/error.dto'

export function UserDockGetMany(path: string, authType: UserAuthType, model, config: PaginateConfig<any>) {
    return applyDecorators(
        Get(path),
        UserAuth(authType),
        ApiOkPaginatedResponse(model, config),
        ApiPaginationQuery(config)
    )
}

export function UserDockGetOne(path: string, authType: UserAuthType, success = null) {
    return applyDecorators(
        Get(path),
        UserAuth(authType),
        ApiResponse({ status: 200, type: success }),
        ApiResponse({ status: 400, type: ErrorDto })
    )
}

export function UserDockPost(path: string, authType: UserAuthType, dto = null, success = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        UserAuth(authType),
        Post(path),
    ]

    if (dto) decorators.push(ApiBody({ type: dto }))

    return applyDecorators(...decorators)
}

export function UserDockPut(path: string, authType: UserAuthType, dto = null, success = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        UserAuth(authType),
        Put(path),
    ]

    if (dto) decorators.push(ApiBody({ type: dto }))

    return applyDecorators(...decorators)
}

export function UserDockDelete(path: string, authType: UserAuthType, dto = null, success = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        UserAuth(authType),
        Delete(path),
    ]

    if (dto) decorators.push(ApiBody({ type: dto }))

    return applyDecorators(...decorators)
}
