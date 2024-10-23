import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
