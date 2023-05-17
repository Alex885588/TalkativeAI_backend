import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AIDto } from 'src/Mapper/DTO/ai.dto';
import { AIMapper } from 'src/Mapper/EntityMappers/ai.mapper';
import { Repository } from 'typeorm';
import { AI } from '../DBtables/ai';
import { BaseService } from './generic.service';
import { UsersInChats } from 'src/DBtables/users.in.chats';
import { UsersInChatsDTO } from 'src/Mapper/DTO/users.in.chats.dto';
import { UsersInChatsMapper } from 'src/Mapper/EntityMappers/users.in.chats.mapper';

@Injectable()
export class usersInChatsService extends BaseService<UsersInChats, UsersInChatsDTO>{
    constructor(
        @InjectRepository(UsersInChats)
        private usersInchatsRepository: Repository<UsersInChats>,
        private readonly usersInchatsMapper: UsersInChatsMapper
    ) {
        super(usersInchatsRepository, usersInchatsMapper)
    }

    async getAllChatsByUserId(userId: number): Promise<UsersInChats[]> {
        return this.usersInchatsRepository.find({
            where: {
                userId: userId,
            },
        });
    }

}

