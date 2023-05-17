import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseMapper<Entity, DTO> {
    abstract toDto(item: Entity): DTO

    abstract toEntity(aiDto: DTO): Entity;
}
