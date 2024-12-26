import { ApiProperty } from '@nestjs/swagger'
import { User } from '../user/user.entity'

export class Session {
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
        type: 'integer',
        format: 'int32',
    })
    user_id: number
    @ApiProperty({
        type: () => User,
        required: false,
    })
    user?: User
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
