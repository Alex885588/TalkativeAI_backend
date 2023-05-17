import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Messages } from '../DBtables/messages';
import { MessagesService } from 'src/DBservices/message.service';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';
import { MessagesDto } from 'src/Mapper/DTO/messages.dto';
import { UsersInChats } from 'src/DBtables/users.in.chats';
import { UsersInChatsDTO } from 'src/Mapper/DTO/users.in.chats.dto';
import { usersInChatsService } from 'src/DBservices/users.in.chats.service';

@Controller('usersInChats')
export class UsersInChatsController {
    constructor(private readonly groupsService: usersInChatsService) { }

    @Get()
    @UseGuards(AuthGuard,AdminAuthGuard)
    async findAllUsersInAllChats(): Promise<UsersInChats[]> {
        return this.groupsService.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard,AdminAuthGuard)
    async findUserInChatById(@Param('id') userId: number): Promise<UsersInChatsDTO> {
        return this.groupsService.getById(userId);
    }

    @Post('/allGroupsOfUser')
    @UseGuards(AuthGuard)
    async findAllChatsByUserId(@Body('userId') userId: number): Promise<UsersInChatsDTO[]> { 
        return this.groupsService.getAllChatsByUserId(userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createUserInChat(@Body("userId") userId: number,@Body("chatId") chatId: number ): Promise<UsersInChatsDTO> {
        return this.groupsService.create({userId, chatId});
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: number): Promise<void> {
        return this.groupsService.delete(id);
    }
}