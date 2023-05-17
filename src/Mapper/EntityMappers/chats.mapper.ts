import { Injectable } from '@nestjs/common';
import { Chats } from 'src/DBtables/chats';
import { ChatsDto } from '../DTO/chats.dto';
import { BaseMapper } from './base.mapper';

@Injectable()
export class ChatsMapper extends BaseMapper<Chats, ChatsDto>{
    toDto(chats: Chats): ChatsDto {
        const chatsDto = new ChatsDto();
        chatsDto.id = chats.id;
        chatsDto.chatName = chats.chatName;
        return chatsDto;
    }

    toEntity(chatsDto: ChatsDto): Chats {
        const chats = new Chats();
        chats.id = chatsDto.id;
        chats.chatName = chatsDto.chatName;
        return chats;
    }
}
