import { UserRole } from "src/enum/enum.user";
import { BaseDTO } from "./base.dto";

export class UsersInChatsDTO extends BaseDTO {
    userId?: number;
    chatId?: number;
}
