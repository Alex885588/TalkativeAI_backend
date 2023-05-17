import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException, InternalServerErrorException, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AIDto } from 'src/Mapper/DTO/ai.dto';
import { AiService } from '../DBservices/ai.service';
import { AI } from '../DBtables/ai';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Get()
    @UseGuards(AuthGuard, AdminAuthGuard)
    async getAll(): Promise<AI[]> {
        try {
            return await this.aiService.getAll();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async getAiById(@Param('id') id: number): Promise<AIDto> {
        const AI = await this.aiService.getById(id);
        if (!AI) {
            throw new NotFoundException('AI not found');
        }
        return AI;
    }

    @Post()
    @UseGuards(AuthGuard, AdminAuthGuard)
    async createAI(@Body('aiName') aiName: string, @Body('slug') slug: string): Promise<AIDto> {
        try {
            return await this.aiService.create({ aiName, slug });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async updateAI(@Param('id') id: number, @Body('aiName') aiName: string, @Body('slug') slug: string): Promise<AIDto> {
        const updatedAi = await this.aiService.update({ id, aiName, slug });
        if (!updatedAi) {
            throw new NotFoundException('AI not found');
        }
        return updatedAi;
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async deleteAI(@Param('id') id: number): Promise<void> {
        try {
            await this.aiService.delete(id);
        } catch (error) {
            throw new NotFoundException('AI not found');
        }
    }
}
