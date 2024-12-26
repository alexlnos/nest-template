import { ApiProperty } from '@nestjs/swagger'
import { Session } from '../session/session.entity'

export class User {
    @ApiProperty({
        type: 'integer',
        format: 'int32',
    })
    id: number
    @ApiProperty({
        type: 'string',
    })
    name: string
    @ApiProperty({
        type: 'string',
    })
    email: string
    @ApiProperty({
        type: 'string',
    })
    password: string
    @ApiProperty({
        type: () => Session,
        isArray: true,
        required: false,
    })
    sessions?: Session[]
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
