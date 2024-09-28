import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../_helpers/database/base/base.entity'

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @Column({ nullable: false })
    name: string

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    email: string

    @Exclude()
    @Column({ nullable: false })
    password: string
}
