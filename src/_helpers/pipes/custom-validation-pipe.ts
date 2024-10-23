import { BadRequestException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

import { ErrorValidationCodeEnum } from '../enums/validator/error.validation.code.enum'
import { errorMessage } from '../errors/error.message'

export class CustomValidationPipe extends ValidationPipe {
    constructor(options?: ValidationPipeOptions) {
        super({
            ...options,
            // Важно: Отключаем автоматическое преобразование ошибок
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = this.buildErrorMessages(errors)
                return new BadRequestException(messages)
            },
        })
    }

    private buildErrorMessages(errors: ValidationError[], parentPath = ''): any[] {
        return errors.flatMap(error => this.mapChildrenErrors(error, parentPath))
    }

    private mapChildrenErrors(error: ValidationError, parentPath = ''): any[] {
        const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property
        const messages = []

        if (error.constraints) {
            for (const [constraintName] of Object.entries(error.constraints)) {
                console.log(constraintName)
                const errorCode = ErrorValidationCodeEnum[constraintName.toUpperCase()] || 'UNKNOWN_ERROR'

                messages.push({
                    property: propertyPath,
                    errorCode,
                    message: errorMessage(propertyPath, errorCode),
                })
            }
        }

        if (error.children && error.children.length > 0) {
            for (const childError of error.children) {
                messages.push(...this.mapChildrenErrors(childError, propertyPath))
            }
        }

        return messages
    }
}
