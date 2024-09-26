import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

import { ErrorCodeEnum } from '../../enums/validator/error.code.enum'
import { ErrorDto } from '../../errors/error.dto'

export const PaginateValidate = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const query = request.query

    if (query.order) {
        const order = query.order
        if (order !== 'ASC' && order !== 'DESC') {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.INVALID_QUERY_STRING))
        }
    }

    return new PaginateValidateType({
        skip: query.page ? (query.page - 1) * query.limit : 0,
        take: query.limit ? query.limit : 10,
        search: query.search ?? '',
        order: { [query.sortField ?? 'id']: query.sort ?? 'DESC' },
    })
})

export class PaginateValidateType<T = object> {
    @ApiProperty()
    @IsOptional()
    skip: number

    @ApiProperty()
    @IsOptional()
    take: number

    @ApiProperty()
    @IsOptional()
    order: { [key: string]: 'ASC' | 'DESC' }

    @ApiProperty()
    @IsOptional()
    search: string

    constructor(partial: Partial<PaginateValidateType<T>>) {
        Object.assign(this, partial)
    }
}
