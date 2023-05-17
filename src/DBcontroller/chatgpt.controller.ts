import { Controller, Post, Body, } from '@nestjs/common';
import { ChatGPTService } from 'src/DBservices/AiServices/chatgpt.services';

@Controller('chatgpt')
export class ChatGPTController {
    constructor(private readonly chatbotService: ChatGPTService) {}

    @Post('response')
    async generateResponse(@Body("message") message: string): Promise<void>{
        return await this.chatbotService.generateResponse(message);   
    }
}
