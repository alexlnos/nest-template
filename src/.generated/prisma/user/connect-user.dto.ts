import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator'

export class ConnectUserDto {
    @ApiProperty({
        type: 'integer',
        format: 'int32',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsInt()
    id?: number
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string
}
