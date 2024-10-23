import { ApiProperty } from '@nestjs/swagger'

import { ErrorCodeEnum } from '../enums/validator/error.code.enum'

export class ErrorDto {
    @ApiProperty({ enum: ErrorCodeEnum, required: false, example: ErrorCodeEnum.AUTH_FAIL })
    errorMessage?: ErrorCodeEnum

    @ApiProperty({
        type: () => String,
        required: false,
        isArray: true,
        example: [`password|IsNotEmpty`],
    })
    message?: string[]

    @ApiProperty({ example: 'Bad Request' })
    error: string

    @ApiProperty({ example: 400 })
    statusCode: number

    @ApiProperty({ required: false })
    description?: string

    constructor(message: ErrorCodeEnum, description?: string) {
        this.statusCode = 400
        this.error = 'Bad Request'
        this.errorMessage = message
        this.description = description
    }
}
