import { DockGetOne, DockPost } from '@common/swagger/user.swagger.helper'
import { DeepPartial } from 'typeorm'
import { applyDecorators } from '@nestjs/common'

export function Crud<T, CreateDto extends DeepPartial<T>, UpdateDto extends DeepPartial<T>>(
    entity: T,
    createDto: CreateDto,
    UpdateDto: UpdateDto,
) {
    return function (target: Function) {
        if (!target.prototype.getOne) {
            target.prototype.getOne = function (uuid: string) {
                return this.service.getOne(uuid)
            }

            applyDecorators(DockGetOne(':uuid', entity))(
                target.prototype,
                'getOne',
                Object.getOwnPropertyDescriptor(target.prototype, 'getOne'),
            )
        }

        if (!target.prototype.create) {
            target.prototype.create = function (dto: CreateDto) {
                return this.service.create(dto)
            }

            applyDecorators(DockPost('', createDto, entity))(
                target.prototype,
                'create',
                Object.getOwnPropertyDescriptor(target.prototype, 'create'),
            )
        }
    }
}
