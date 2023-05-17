import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from 'src/DBtables/messages';
import { User } from 'src/DBtables/user';
import { Chats } from 'src/DBtables/chats';
import { AI } from 'src/DBtables/ai';
import { BaseService } from './generic.service';
import { MessagesDto } from 'src/Mapper/DTO/messages.dto';
import { MessagesMapper } from 'src/Mapper/EntityMappers/messages.mapper';

@Injectable()
export class MessagesService extends BaseService<Messages,MessagesDto> {
    constructor(
        @InjectRepository(Messages)
        private messagesRepository: Repository<Messages>,
        private readonly messagesMapper: MessagesMapper
    ) {
         super(messagesRepository,messagesMapper)
     }

     async getMessagesOfuserInChats(userId: number,chatId:number): Promise<Messages[]> {
        return this.messagesRepository.find({
            where: {
                userId: userId,
                chatId:chatId
            },
        });
    } 
}