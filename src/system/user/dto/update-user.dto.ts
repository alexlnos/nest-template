import { TypeValidate, Validate } from '../../../_helpers/decorators/auth.helpers'

export class UpdateUserDto {
    @Validate(TypeValidate.STRING, { required: false })
    name?: string
}
