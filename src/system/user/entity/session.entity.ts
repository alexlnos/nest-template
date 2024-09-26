import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { User } from './user.entity'
import { BaseEntity } from '../../../_helpers/database/base/base.entity'

@Entity('sessions')
export class Session extends BaseEntity {
    @ApiProperty()
    @Column()
    token: string

    @ApiProperty()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ApiProperty()
    @Column({ name: 'user_id' })
    user_id: number

    @ApiProperty()
    @Column({
        type: 'timestamp without time zone',
        nullable: true,
        default: null,
    })
    expire_at: Date
}
