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
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

    @ApiProperty()
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date

    @ApiProperty()
    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at: Date
}
