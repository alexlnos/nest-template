import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity, Unique } from 'typeorm'

import { BaseEntity } from '@common/database/base/base.entity'
import { RolesEnum } from '../enum/roles.enum'

@Entity('users')
@Unique('UQ_user_email', ['email'])
export class User extends BaseEntity {
    @ApiProperty()
    @Column({ nullable: false })
    name: string

    @ApiProperty()
    @Column({ nullable: false })
    email: string

    @Exclude()
    @Column({ nullable: false })
    password: string

    @Column({ type: 'enum', nullable: false, enum: RolesEnum, default: RolesEnum.USER })
    role: RolesEnum
}
