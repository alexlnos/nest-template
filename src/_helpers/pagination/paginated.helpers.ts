import { PaginateConfig } from 'nestjs-paginate'

import { User } from '../../.generated/prisma'

export const UsersPaginated: PaginateConfig<User> = {
    defaultSortBy: [['created_at', 'DESC']],
    filterableColumns: {
        id: true,
        name: true,
        email: true,
    },
    relations: {},
    searchableColumns: [],
    select: undefined,
    sortableColumns: ['id'],
    where: undefined,
    maxLimit: 60,
    defaultLimit: 60,
}
