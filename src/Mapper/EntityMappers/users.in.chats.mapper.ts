import { Injectable } from '@nestjs/common';
import { User } from 'src/DBtables/user';
import { UserRole } from 'src/enum/enum.user';
import { UserDto } from '../DTO/user.dto';
import { BaseMapper } from './base.mapper';
import { UsersInChats } from 'src/DBtables/users.in.chats';
import { UsersInChatsDTO } from '../DTO/users.in.chats.dto';

@Injectable()
export class UsersInChatsMapper extends BaseMapper<UsersInChats, UsersInChatsDTO>{
    toDto(user: UsersInChats): UsersInChatsDTO {
        const userDto = new UsersInChatsDTO();
        userDto.id = user.id
        userDto.userId = user.userId;
        userDto.chatId = user.chatId;
        return userDto;
    }

    toEntity(userDto: UsersInChatsDTO): UsersInChats {
        const user = new UsersInChats();
        user.id = userDto.id;
        user.userId = userDto.userId;
        user.chatId = userDto.chatId;
        return user;
    }
}
