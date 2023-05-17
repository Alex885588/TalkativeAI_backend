import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AIDto } from 'src/Mapper/DTO/ai.dto';
import { AIMapper } from 'src/Mapper/EntityMappers/ai.mapper';
import { Repository } from 'typeorm';
import { AI } from '../DBtables/ai';
import { BaseService } from './generic.service';

@Injectable()
export class AiService extends BaseService<AI, AIDto>{
    constructor(
        @InjectRepository(AI)
        private aiRepository: Repository<AI>,
        private readonly aiMapper: AIMapper
    ) {
         super(aiRepository,aiMapper)
     }

}

