import { Injectable } from '@nestjs/common';
import { Messages } from 'src/DBtables/messages';
import { MessagesDto } from '../DTO/messages.dto';
import { BaseMapper } from './base.mapper';

@Injectable()
export class MessagesMapper extends BaseMapper<Messages, MessagesDto>{
    toDto(messages: Messages): MessagesDto {
        const messagesDto = new MessagesDto();
        messagesDto.text = messages.text;
        return messagesDto;
    }

    toEntity(messagesDto: MessagesDto): Messages {
        const messages = new Messages();
        messages.id = messagesDto.id;
        messages.text = messagesDto.text;
        messages.userId = messagesDto.userId;
        messages.chatId = messagesDto.chatId;
        messages.createdAt = new Date()
        messages.aiId = messagesDto.aiId;
        return messages;
    }
}
