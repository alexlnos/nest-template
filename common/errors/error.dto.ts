import { ApiProperty } from '@nestjs/swagger'

import { ErrorCodeEnum } from '../enums/validator/error.code.enum'
import { ErrorValidationCodeEnum } from '../enums/validator/error.validation.code.enum'
import { HttpException, HttpExceptionBody, HttpStatus } from '@nestjs/common'

export class ErrorDto extends HttpException {
    private static codes: Record<ErrorCodeEnum, HttpExceptionBody> = {
        UNAUTHORIZED: {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'Unauthorized',
            message: '',
        },
        FORBIDDEN: {
            statusCode: HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: '',
        },
        AUTH_FAIL: {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'Bad Request',
            message: '',
        },
        ENTITY_NOT_FOUND: {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found',
            message: '',
        },
        ENTITY_CREATION_FAIL: {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: '',
        },
    }
    @ApiProperty({ enum: ErrorCodeEnum, required: false, example: ErrorCodeEnum.ENTITY_CREATION_FAIL })
    message: ErrorCodeEnum

    @ApiProperty({ example: 'Bad Request' })
    error: string

    @ApiProperty({ example: 400 })
    statusCode: number

    @ApiProperty({ required: false })
    description?: string
    @ApiProperty({
        type: () => String,
        required: false,
        isArray: true,
        example: [`password|${ErrorValidationCodeEnum.IS_NOT_EMPTY}`],
    })
    messages?: string[]

    constructor(message: ErrorCodeEnum, description?: string) {
        let body = {
            ...ErrorDto.codes[message],
            message,
            description,
        }
        super(body, body.statusCode)
    }
}
