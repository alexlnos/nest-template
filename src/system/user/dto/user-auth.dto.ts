import { TypeValidate, Validate } from '../../../_helpers/decorators/auth.helpers'

export class UserAuthDto {
    @Validate(TypeValidate.EMAIL)
    email: string

    @Validate(TypeValidate.STRING)
    password: string
}
