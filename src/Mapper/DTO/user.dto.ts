import { UserRole } from "src/enum/enum.user";
import { BaseDTO } from "./base.dto";

export class UserDto extends BaseDTO {
    email?: string;
    password?: string;
    type?: UserRole
}
