import { BadRequestException } from '@nestjs/common'
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm'

import { ErrorCodeEnum } from '../../enums/validator/error.code.enum'
import { ErrorDto } from '../../errors/error.dto'
import { PaginatedResponseDto } from '../../pagination/dto/pagination-response.dto'

export class BaseService<T, SaveDto extends DeepPartial<T>, UpdateDto extends DeepPartial<T>> {
    constructor(private readonly repository: Repository<T>) {
    }

    async find(options: FindManyOptions<T>) {
        const [result, total] = await this.repository.findAndCount({
            ...options,
        })

        return new PaginatedResponseDto(result, total)
    }

    async findOne(options: FindOneOptions<T>) {
        try {
            return await this.repository.findOne(options)
        } catch (e) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.ENTITY_NOT_FOUND))
        }
    }

    async save(dto: SaveDto) {
        try {
            const entity = this.repository.create(dto)

            return await this.repository.save(entity)
        } catch (e) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.ENTITY_CREATION_FAIL, e.message))
        }
    }

    async update(id: number, partialEntity: UpdateDto) {
        const entity = await this.repository.findOne({ where: { id } } as FindOneOptions)

        if (!entity) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.ENTITY_NOT_FOUND))
        }

        const updatedEntity = this.repository.merge(entity, partialEntity)
        return this.repository.save(updatedEntity)
    }

    async delete(id: number) {
        const entity = await this.repository.findOne({ where: { id } } as FindOneOptions)

        if (!entity) {
            throw new BadRequestException(new ErrorDto(ErrorCodeEnum.ENTITY_NOT_FOUND))
        }

        await this.repository.softDelete(id)
        return this.repository.findOne({ where: { id }, withDeleted: true } as FindOneOptions)
    }
}
