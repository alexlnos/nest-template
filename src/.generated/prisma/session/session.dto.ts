import { ApiProperty } from '@nestjs/swagger'

export class SessionDto {
    @ApiProperty({
        type: 'integer',
        format: 'int32',
    })
    id: number
    @ApiProperty({
        type: 'string',
    })
    token: string
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        nullable: true,
    })
    expire_at: Date | null
    @ApiProperty({
        type: 'string',
        format: 'date-time',
    })
    created_at: Date
    @ApiProperty({
        type: 'string',
        format: 'date-time',
    })
    updated_at: Date
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        nullable: true,
    })
    deleted_at: Date | null
}
