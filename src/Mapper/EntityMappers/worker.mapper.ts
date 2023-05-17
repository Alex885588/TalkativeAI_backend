import { Injectable } from "@nestjs/common";
import { Workers } from "src/DBtables/workers";
import { WorkersDto } from "../DTO/workers.dto";
import { BaseMapper } from "./base.mapper";

@Injectable()
export class WorkersMapper extends BaseMapper<Workers, WorkersDto>{
    toDto(item: Workers): WorkersDto {
        const workerDto = new WorkersDto();
        workerDto.id = item.id
        workerDto.name = item.name;
        workerDto.data = item.data;
        return workerDto;
    }
    toEntity(workerDto: WorkersDto): Workers {
        const worker = new Workers();
        worker.id = workerDto.id;
        worker.name = workerDto.name;
        worker.data = workerDto.data;
        worker.userId = workerDto.userId;
        worker.workerTypeId = workerDto.workerTypeId
        return worker;
    }

}