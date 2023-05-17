import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workers } from 'src/DBtables/workers';
import { WorkersDto } from 'src/Mapper/DTO/workers.dto';
import { WorkersMapper } from 'src/Mapper/EntityMappers/worker.mapper';
import { Repository } from 'typeorm';
import { BaseService } from './generic.service';

@Injectable()
export class WorkersService extends BaseService<Workers, WorkersDto>{
    constructor(
        @InjectRepository(Workers)
        private workersRepository: Repository<Workers>,
        private readonly workersMapper: WorkersMapper
    ) {
        super(workersRepository, workersMapper)
    }

    async getWorkerByUserIdAndTypeId(userId: number): Promise<WorkersDto[]> {
        return this.workersRepository.find({
            where: {
                userId: userId,
            },
        });
    }

    async isWorkerExistsForUser(userId: number, id: number): Promise<Boolean> {
        const isExists =await this.workersRepository.find({
            where: {
                userId: userId,
                id: id
            },
        });
        if (isExists.length!==0) {
            return true
        }
        return false
    }

}

