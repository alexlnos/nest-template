import { Get, Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { UserAuth, UserAuthType } from '../decorators/reqests.helpers'
import { ErrorDto } from '../errors/error.dto'
import { PaginatedResponseDto } from '../pagination/dto/pagination-response.dto'

export function PaginatedDocs<DTO>(
    dto: Type<DTO>,
    path: string = '',
    userAuthType: UserAuthType = null,
    argDtos: Record<string, Type<any>> = {}
) {
    const extraModels = Object.values(argDtos)
    const requiredKeys = Object.keys(argDtos)

    const decorators = []
    if (userAuthType !== null) decorators.push(UserAuth(userAuthType))

    return applyDecorators(
        ApiQuery({ name: 'page', required: false, type: () => Number }),
        ApiQuery({ name: 'limit', required: false, type: () => Number }),
        ApiQuery({ name: 'search', required: false, type: () => String, description: 'Шашлык' }),
        ApiQuery({ name: 'sort', required: false, type: () => String, description: 'ASC' }),
        ApiQuery({ name: 'sortField', required: false, type: () => String, description: 'id' }),
        ApiExtraModels(PaginatedResponseDto, dto, ...extraModels),
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        required: ['data', 'total', ...requiredKeys],
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(dto) },
                            },
                            ...Object.entries(argDtos).reduce(
                                (acc, [name, type]) => ({
                                    ...acc,
                                    [name]: { $ref: getSchemaPath(type) },
                                }),
                                {}
                            ),
                            total: {
                                type: 'number',
                            },
                        },
                    },
                ],
            },
        }),
        ApiResponse({ status: 400, type: ErrorDto }),
        Get(path),
        ...decorators
    )
}
