export enum ErrorCodeEnum {
    AUTH_FAIL = 'AUTH_FAIL',
    INVALID_QUERY_STRING = 'INVALID_QUERY_STRING',
    ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
    ENTITY_CREATION_FAIL = 'ENTITY_CREATION_FAIL', // ошибка создания сущности
    NOT_ENOUGH_RIGHTS = 'NOT_ENOUGH_RIGHTS', // Недостаточно прав для запроса
    NOT_AUTH = 'NOT_AUTH', // Недостаточно прав для запроса
    RESTAURANT_NOT_FOUND = 'RESTAURANT_NOT_FOUND',
    BASKET_ALREADY_PROCESSED = 'BASKET_ALREADY_PROCESSED', // корзина уже в работе (нельзя очистить)
    EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
}
