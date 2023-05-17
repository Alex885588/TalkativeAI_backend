import { BaseDTO } from "./base.dto";

export class MessagesDto extends BaseDTO {
    text?: string;
    userId?: number;
    chatId?: number;
    createdAt?: Date;
    aiId?: number
}
