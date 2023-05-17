import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Messages } from '../DBtables/messages';
import { MessagesService } from 'src/DBservices/message.service';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';
import { MessagesDto } from 'src/Mapper/DTO/messages.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) { }

    @Get()
    @UseGuards(AuthGuard,AdminAuthGuard)
    async findAllMessages(): Promise<Messages[]> {
        return this.messageService.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard,AdminAuthGuard)
    async findMessageById(@Param('id') messageId: number): Promise<MessagesDto> {
        return this.messageService.getById(messageId);
    }

    @Post('getMessageByUserId')
    @UseGuards(AuthGuard)
    async getMessagesOfuserInChats(@Body("userId") userId: number,  @Body("chatId") chatId: number): Promise<MessagesDto[]> {
        return this.messageService.getMessagesOfuserInChats( userId, chatId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createMessage(@Body("text") text: string, @Body("aiId") aiId: number, @Body("chatId") chatId: number, @Body("userId") userId: number): Promise<MessagesDto> {
        return this.messageService.create({text, userId, chatId, aiId});
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateMessage(@Param('id') id: number, @Body("text") text: string): Promise<MessagesDto> {
        return this.messageService.update({id, text});
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteMessage(@Param('id') id: number): Promise<void> {
        return this.messageService.delete(id);
    }
}