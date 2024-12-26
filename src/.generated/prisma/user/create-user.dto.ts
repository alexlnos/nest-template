import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
    })
    @IsNotEmpty()
    @IsString()
    name: string
    @ApiProperty({
        type: 'string',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    @ApiProperty({
        type: 'string',
    })
    @IsNotEmpty()
    @IsString()
    password: string
}
