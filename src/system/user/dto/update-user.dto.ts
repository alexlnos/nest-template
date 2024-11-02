import { TypeValidate, Validate } from '../../../../common/decorators/validation.helpers'

export class UpdateUserDto {
    @Validate(TypeValidate.STRING, { required: false })
    name?: string
}
