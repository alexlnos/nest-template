import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
} from 'class-validator'

import { ErrorValidationCodeEnum } from '../enums/validator/error.validation.code.enum'
import { errorMessage } from '../errors/error.message'

export enum TypeValidate {
    PHONE,
    EMAIL,
    NUMBER,
    ARRAY,
    STRING,
    BOOLEAN,
    DATE,
    URL,
    DECIMAL,
    ENUM,
    OBJECT,
    UUID,
}

const validateMap = {
    [TypeValidate.EMAIL]: {
        fn: IsEmail(undefined, {
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_EMAIL),
        }),
        propType: String,
    },
    [TypeValidate.PHONE]: {
        fn: IsPhoneNumber(undefined, {
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_PHONE_NUMBER),
        }),
        propType: String,
    },
    [TypeValidate.NUMBER]: {
        fn: IsInt({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_INT),
        }),
        propType: Number,
    },
    [TypeValidate.ARRAY]: {
        fn: IsArray({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_ARRAY),
        }),
        propType: Array,
    },
    [TypeValidate.STRING]: {
        fn: IsString({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_STRING),
        }),
        propType: String,
    },
    [TypeValidate.BOOLEAN]: {
        fn: IsBoolean({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_BOOLEAN),
        }),
        propType: Boolean,
    },
    [TypeValidate.DATE]: {
        fn: IsDate({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_DATE),
        }),
        propType: Date,
    },
    [TypeValidate.URL]: {
        fn: IsUrl(undefined, {
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_URL),
        }),
        propType: String,
    },
    [TypeValidate.DECIMAL]: {
        fn: IsNumber(undefined, {
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.DECIMAL),
        }),
        propType: Number,
    },
    [TypeValidate.OBJECT]: {
        fn: IsObject({
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_OBJECT),
        }),
        propType: Object,
    },
    [TypeValidate.UUID]: {
        fn: IsUUID('all', {
            message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_OBJECT),
        }),
        propType: Object,
    },
}

export function Validate(type: TypeValidate, options?: ApiPropertyOptions) {
    const { fn } = validateMap[type]
    const arr = [
        fn,
        options?.required === false
            ? IsOptional({ message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_OPTIONAL) })
            : IsNotEmpty({ message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_NOT_EMPTY) }),
        ApiProperty(options),
    ]
    if (options && options.maxLength) {
        arr.push(MaxLength(options.maxLength))
    }
    return applyDecorators(...arr)
}

export function ValidateEnum(enumType, options?: ApiPropertyOptions) {
    const arr = [
        IsEnum(enumType, { message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_ENUM) }),
        options?.required === false
            ? IsOptional({ message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_OPTIONAL) })
            : IsNotEmpty({ message: (value) => errorMessage(value, ErrorValidationCodeEnum.IS_NOT_EMPTY) }),
        ApiProperty({ enum: enumType, ...options }),
    ]
    return applyDecorators(...arr)
}
