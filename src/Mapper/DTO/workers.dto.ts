import { UserRole } from "src/enum/enum.user";
import { BaseDTO } from "./base.dto";

export class WorkersDto extends BaseDTO {
    name?: string;
    data?: Record<any, any>;
    userId?: number;
    workerTypeId?: number;
}
