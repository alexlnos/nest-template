import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsOptional, IsString } from 'class-validator'

export class UpdateSessionDto {
    @ApiProperty({
        type: 'string',
        required: false,
    })
    @IsOptional()
    @IsString()
    token?: string
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    expire_at?: Date | null
}
