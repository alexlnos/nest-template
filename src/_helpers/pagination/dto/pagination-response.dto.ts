import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponseDto<T> {
    @ApiProperty({ isArray: true, description: 'Список элементов' })
    data: T[]

    @ApiProperty({ description: 'Общее количество записей' })
    total: number

    constructor(data: T[], total: number) {
        this.data = data
        this.total = total
    }
}
