import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workers } from 'src/DBtables/workers';
import { WorkersType } from 'src/DBtables/workers.type';
import { WorkersDto } from 'src/Mapper/DTO/workers.dto';
import { WorkersTypeDto } from 'src/Mapper/DTO/workers.type.dto';
import { WorkersMapper } from 'src/Mapper/EntityMappers/worker.mapper';
import { WorkersTypeMapper } from 'src/Mapper/EntityMappers/workers.type.mapper';
import { Repository } from 'typeorm';
import { BaseService } from './generic.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class WorkersTypeService extends BaseService<WorkersType, WorkersTypeDto>{
    constructor(
        @InjectRepository(WorkersType)
        private workersRepository: Repository<WorkersType>,
        private readonly workersMapper: WorkersTypeMapper
    ) {
        super(workersRepository, workersMapper)
    }
}


