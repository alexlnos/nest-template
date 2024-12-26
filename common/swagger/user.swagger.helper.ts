import { applyDecorators, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { UserAuth, UserAuthType } from '../decorators/auth.helpers'
import { ErrorDto } from '../errors/error.dto'
import { ApiOkPaginatedResponse, ApiPaginationQuery, PaginateConfig } from 'nestjs-paginate'

export function UserDockGetMany<T>(
    path: string,
    authType: UserAuthType,
    model,
    config: PaginateConfig<T>,
    summary: string = null,
) {
    return applyDecorators(
        Get(path),
        UserAuth(authType),
        ApiOkPaginatedResponse(model, config),
        ApiPaginationQuery(config),
        ApiOperation({ summary: summary || 'Получить список записей' }),
    )
}

export function UserDockGetManyNotPaginate<T>(
    path: string,
    authType: UserAuthType,
    model: { new (): T },
    summary: string = null,
) {
    return applyDecorators(
        Get(path),
        UserAuth(authType),
        ApiOperation({ summary: summary || 'Получить список записей' }),
        ApiOkResponse({
            description: 'Успешный ответ',
            schema: {
                type: 'object',
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                    },
                },
            },
        }),
    )
}

export function UserDockGetOne(path: string, authType: UserAuthType, success = null, summary: string = null) {
    return applyDecorators(
        Get(path),
        UserAuth(authType),
        ApiOperation({ summary: summary || 'Получить запись' }),
        ApiResponse({ status: 200, type: success }),
        ApiResponse({ status: 400, type: ErrorDto }),
    )
}

export function UserDockPost(path: string, authType: UserAuthType, dto = null, success = null, summary: string = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        ApiOperation({ summary: summary || 'Создать запись' }),
        UserAuth(authType),
        Post(path),
    ]

    if (dto) decorators.push(ApiBody({ type: dto }))

    return applyDecorators(...decorators)
}

export function UserDockPut(path: string, authType: UserAuthType, dto = null, success = null, summary: string = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        ApiOperation({ summary: summary || 'Изменить запись' }),
        UserAuth(authType),
        Put(path),
    ]

    if (dto) decorators.push(ApiBody({ type: dto }))

    return applyDecorators(...decorators)
}

export function UserDockDelete(path: string, authType: UserAuthType, success = null, summary: string = null) {
    const decorators: ClassDecorator | MethodDecorator[] = [
        ApiResponse({ status: 400, type: ErrorDto }),
        ApiResponse({ status: 200, type: success }),
        ApiOperation({ summary: summary || 'Удалить запись' }),
        UserAuth(authType),
        Delete(path),
    ]

    return applyDecorators(...decorators)
}
