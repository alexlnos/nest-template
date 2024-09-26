import { ValidationArguments } from 'class-validator'

import { ErrorValidationCodeEnum } from '../enums/validator/error.validation.code.enum'

export function errorMessage(validationArguments: ValidationArguments, message: ErrorValidationCodeEnum) {
    return `${validationArguments.property}|${message}`
}
