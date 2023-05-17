import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseMapper } from 'src/Mapper/EntityMappers/base.mapper';
import { Repository } from 'typeorm';
import { BaseDTO } from 'src/Mapper/DTO/base.dto';

@Injectable()
export abstract class BaseService<T , DTO extends BaseDTO> {
    constructor(
        @InjectRepository(BaseService<T, DTO>)
        private genericRepository: Repository<T>,
        private readonly genericMapper: BaseMapper<T, DTO>
    ) { }

    async getAll(): Promise<T[]> {
        return this.genericRepository.find();
    }

    async getById(id: number): Promise<DTO> {
        const generic = await this.genericRepository.findOneById(id)
        return this.genericMapper.toDto(generic);
    }

    async create(item: DTO): Promise<DTO> {
        const generic = this.genericMapper.toEntity(item);
        const createdGeneric = await this.genericRepository.create(generic);
        await this.genericRepository.save(createdGeneric);
        return this.genericMapper.toDto(createdGeneric);
    }

    async update(item: DTO): Promise<DTO> {
        const generic = await this.genericRepository.findOneById(item.id)
        if (!generic) {
            throw new Error('Not found');
        }
        const genericEntity = this.genericMapper.toEntity(item);
        await this.genericRepository.update(+item.id, genericEntity as any);
        return this.genericMapper.toDto(genericEntity)
    }

    async delete(id: number): Promise<void> {
        const result = await this.genericRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Deleted element not found');
        }
    }
}

