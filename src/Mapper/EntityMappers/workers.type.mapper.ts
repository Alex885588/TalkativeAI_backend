import { Injectable } from "@nestjs/common";
import { WorkersType } from "src/DBtables/workers.type";
import { WorkersTypeDto } from "../DTO/workers.type.dto";
import { BaseMapper } from "./base.mapper";

@Injectable()
export class WorkersTypeMapper extends BaseMapper<WorkersType, WorkersTypeDto>{
    toDto(item: WorkersType): WorkersTypeDto {
        const workerDto = new WorkersTypeDto();
        workerDto.id = item.id
        workerDto.position = item.position;
        workerDto.description = item.description;
        workerDto.iconURL = item.iconURL;
        return workerDto;
    }
    toEntity(workerDto: WorkersTypeDto): WorkersType {
        const worker = new WorkersType();
        worker.id = workerDto.id;
        worker.position = workerDto.position;
        worker.description = workerDto.description;
        worker.iconURL = workerDto.iconURL;
        worker.iconPath = workerDto.iconPath;
        return worker;
    }

}