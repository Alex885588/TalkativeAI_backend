import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Chats } from '../DBtables/chats';
import { ChatsService } from 'src/DBservices/chat.service';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';
import { ChatsDto } from 'src/Mapper/DTO/chats.dto';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) { }

    @Get()
    @UseGuards(AuthGuard, AdminAuthGuard)
    async findAllChats(): Promise<Chats[]> {
        try {
            return await this.chatsService.getAll();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findChatById(@Param('id') id: number): Promise<ChatsDto> {
        const getChat = await this.chatsService.getById(id);
        if (!getChat) {
            throw new NotFoundException('Chat not found');
        }
        return getChat;
    }

    @Post()
    @UseGuards(AuthGuard)
    async createChat(@Body("chatName") chatName: string): Promise<ChatsDto> {
        try {
            return await this.chatsService.create({ chatName });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('chatNames')
    async getChatNamesByIds(@Body() body: { chatIds: number[] }): Promise<string[]> {
        const { chatIds } = body;
        const chatNamePromises = chatIds.map((id) => this.chatsService.getChatNameById(id));
        const chatNames = await Promise.all(chatNamePromises);
        return chatNames.filter((name) => name !== undefined);
    }

    @Post('/defaultGroup')
    @UseGuards(AuthGuard)
    async createFirstChat(@Body("chatName") chatName: string): Promise<ChatsDto> {
        try {
            return await this.chatsService.create({ chatName });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateChat(@Param('id') id: number, @Body("chatName") chatName: string): Promise<ChatsDto> {
        const updatedChat = await this.chatsService.update({ id, chatName });
        if (!updatedChat) {
            throw new NotFoundException('Chat not found');
        }
        return updatedChat;
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async deleteChat(@Param('id') id: number): Promise<void> {
        try {
            await this.chatsService.delete(id);
        } catch (error) {
            throw new NotFoundException('Chat not found');
        }
    }
}