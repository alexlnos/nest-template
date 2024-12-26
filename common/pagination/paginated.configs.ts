import {PaginateConfig} from 'nestjs-paginate'
import {User} from '../../src/system/user/entity/user.entity'

export const UsersPaginated: PaginateConfig<User> = {
    defaultSortBy: [['createdAt', 'DESC']],
    filterableColumns: {
        uuid: true,
        name: true,
        email: true,
        phone: true,
    },
    relations: {},
    searchableColumns: [],
    select: undefined,
    sortableColumns: ['uuid'],
    where: undefined,
    maxLimit: 60,
    defaultLimit: 60,
}
