import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsDto } from 'src/Mapper/DTO/chats.dto';
import { ChatsMapper } from 'src/Mapper/EntityMappers/chats.mapper';
import { Repository } from 'typeorm';
import { Chats } from '../DBtables/chats';
import { BaseService } from './generic.service';

@Injectable()
export class ChatsService extends BaseService<Chats, ChatsDto> {
    constructor(
        @InjectRepository(Chats)
        private chatsRepository: Repository<Chats>,
        private readonly chatsMapper: ChatsMapper
    ) { super(chatsRepository, chatsMapper) }

    async getChatNameById(id: number) {
        const chat = await this.chatsRepository.findOne({
            where: {
                id: id
            },
        });
        return chat.chatName
    }
}