import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'

import { CreateUserDto, UpdateUserDto } from '../../../.generated/prisma'
import { ErrorCodeEnum } from '../../../_helpers/enums/validator/error.code.enum'
import { ErrorDto } from '../../../_helpers/errors/error.dto'
import { AppPrismaService } from '../../../app.prisma.service'
import { UserAuthDto } from '../dto/user-auth.dto'

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private prisma: AppPrismaService
    ) {}

    get headers() {
        return {
            authorization: 'Bearer ' + this.configService.get('SERVICE_TOKEN_AUTH'),
        }
    }

    async authenticate(dto: UserAuthDto) {
        const user = await this.prisma.user.findFirst({
            where: { email: dto.email },
        })

        if (!user) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.AUTH_FAIL))
        }

        const isPasswordValid = await bcryptjs.compare(dto.password, user.password)
        if (!isPasswordValid) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.AUTH_FAIL))
        }

        return await this.generateToken(user)
    }

    async register(dto: CreateUserDto) {
        const saltRounds = 10
        const hashedPassword = await bcryptjs.hash(dto.password, saltRounds)

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
        })

        if (!user) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.AUTH_FAIL))
        }

        return await this.generateToken(user)
    }

    async generateToken(user: User) {
        const token = this.jwtService.sign(
            {},
            { expiresIn: this.configService.get('JWT_EXPIRES'), secret: this.configService.get('JWT_SECRET') }
        )

        const userVerify = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SECRET'),
        })

        const session = await this.prisma.session.create({
            data: {
                token,
                expire_at: new Date(userVerify.exp * 1000),
                user_id: user.id,
            },
        })
        return session
    }

    public async findSessionByToken(token: string) {
        const session = await this.prisma.session.findFirst({
            where: {
                token: token,
                expire_at: {
                    gt: new Date(),
                },
            },
            include: {
                user: true,
            },
        })
        return session
    }

    public async update(user: User, dto: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: dto,
        })
        return updatedUser
    }
}
