import { TypeValidate, Validate } from '@common/decorators/validation.helpers'

export class CreateUserDto {
    @Validate(TypeValidate.EMAIL)
    email: string

    @Validate(TypeValidate.STRING)
    password: string

    @Validate(TypeValidate.STRING)
    name: string
}
