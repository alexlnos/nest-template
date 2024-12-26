import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { User } from './user.entity'
import { BaseEntity } from '@common/database/base/base.entity'

@Entity('sessions')
@Index('IDX_session_user_uuid', ['user_uuid'])
export class Session extends BaseEntity {
    @ApiProperty()
    @Column()
    token: string

    @ApiProperty()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
    @Index('FK_session_user_uuid')
    user: User

    @ApiProperty()
    @Column({ name: 'user_uuid' })
    user_uuid: string

    @ApiProperty()
    @Column({
        type: 'timestamp without time zone',
        nullable: true,
        default: null,
    })
    expire_at: Date
}
