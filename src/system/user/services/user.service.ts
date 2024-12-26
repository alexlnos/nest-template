import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcryptjs from 'bcryptjs'
import { In, MoreThan, Repository } from 'typeorm'

import { ErrorCodeEnum } from '../../../../common/enums/validator/error.code.enum'
import { ErrorDto } from '../../../../common/errors/error.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserAuthDto } from '../dto/user-auth.dto'
import { Session } from '../entity/session.entity'
import { User } from '../entity/user.entity'
import { RolesEnum } from '../enum/roles.enum'

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Session) private sessionRepository: Repository<Session>,
        private configService: ConfigService,
    ) {}

    get headers() {
        return {
            authorization: 'Bearer ' + this.configService.get('SERVICE_TOKEN_AUTH'),
        }
    }

    async authenticate(dto: UserAuthDto, isAdmin: boolean = false) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email, role: isAdmin ? undefined : In([RolesEnum.MODERATOR, RolesEnum.ADMIN]) },
        })

        if (!user) {
            throw new ErrorDto(ErrorCodeEnum.AUTH_FAIL)
        }

        const isPasswordValid = await bcryptjs.compare(dto.password, user.password)
        if (!isPasswordValid) {
            throw new ErrorDto(ErrorCodeEnum.AUTH_FAIL)
        }

        return await this.generateToken(user)
    }

    async register(dto: CreateUserDto) {
        const saltRounds = 10
        const hashedPassword = await bcryptjs.hash(dto.password, saltRounds)

        const user = await this.userRepository.save({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        })

        if (!user) {
            throw new ErrorDto(ErrorCodeEnum.AUTH_FAIL)
        }

        return await this.generateToken(user)
    }

    async generateToken(user: User) {
        const token = this.jwtService.sign(
            {},
            { expiresIn: this.configService.get('JWT_EXPIRES'), secret: this.configService.get('JWT_SECRET') },
        )

        const userVerify = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SECRET'),
        })

        return await this.sessionRepository.save(
            {
                token,
                expire_at: new Date(userVerify.exp * 1000),
                user_uuid: user.uuid,
            },
            { transaction: true },
        )
    }

    public async findSessionByToken(token: string) {
        return await this.sessionRepository.findOne({
            where: {
                token,
                expire_at: MoreThan(new Date()),
            },
            relations: { user: true },
        })
    }

    public async update(user: User, dto: UpdateUserDto) {
        user = await this.userRepository.save(user)
        return user
    }
}
