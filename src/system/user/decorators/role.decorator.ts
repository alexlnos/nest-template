import { SetMetadata } from '@nestjs/common'
import { RolesEnum } from '../enum/roles.enum'

export const Roles = (role: RolesEnum) => SetMetadata('role', role)
