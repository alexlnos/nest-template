import { TypeValidate, Validate } from '../../../_helpers/decorators/auth.helpers'

export class CreateUserDto {
    @Validate(TypeValidate.EMAIL)
    email: string

    @Validate(TypeValidate.STRING)
    password: string

    @Validate(TypeValidate.STRING)
    name: string
}
