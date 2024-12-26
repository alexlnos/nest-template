export enum RolesEnum {
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

export const RoleHierarchy: Record<RolesEnum, number> = {
    [RolesEnum.USER]: 1,
    [RolesEnum.MODERATOR]: 2,
    [RolesEnum.ADMIN]: 3,
}
