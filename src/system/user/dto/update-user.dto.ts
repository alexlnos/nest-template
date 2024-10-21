import { TypeValidate, Validate } from '../../../_helpers/decorators/validation.helpers'

export class UpdateUserDto {
    @Validate(TypeValidate.STRING, { required: false })
    name?: string
}
