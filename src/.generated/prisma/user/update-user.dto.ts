import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
    @ApiProperty({
        type: 'string',
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string
    @ApiProperty({
        type: 'string',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string
    @ApiProperty({
        type: 'string',
        required: false,
    })
    @IsOptional()
    @IsString()
    password?: string
}
