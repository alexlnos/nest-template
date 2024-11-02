import { TypeValidate, Validate } from '../../../../common/decorators/validation.helpers'

export class UserAuthDto {
    @Validate(TypeValidate.EMAIL)
    email: string

    @Validate(TypeValidate.STRING)
    password: string
}
