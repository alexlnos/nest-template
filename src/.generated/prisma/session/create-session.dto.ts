import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSessionDto {
    @ApiProperty({
        type: 'string',
    })
    @IsNotEmpty()
    @IsString()
    token: string
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
