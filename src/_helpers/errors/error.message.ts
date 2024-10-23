import { ErrorValidationCodeEnum } from '../enums/validator/error.validation.code.enum'

export function errorMessage(property: string, message: ErrorValidationCodeEnum) {
    return `${property}|${message}`
}
