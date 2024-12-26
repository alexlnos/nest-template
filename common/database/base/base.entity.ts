import { ApiProperty } from '@nestjs/swagger'
import {
    BaseEntity as BaseEntityTypeOrm,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

export abstract class BaseEntity extends BaseEntityTypeOrm {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date

    @ApiProperty()
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date
}
