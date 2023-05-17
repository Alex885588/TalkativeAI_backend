import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Messages } from '../DBtables/messages';
import { MessagesService } from 'src/DBservices/message.service';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';
import { MessagesDto } from 'src/Mapper/DTO/messages.dto';
import { WorkersService } from 'src/DBservices/workers.service';
import { Workers } from 'src/DBtables/workers';
import { WorkersDto } from 'src/Mapper/DTO/workers.dto';
import { WorkersTypeService } from 'src/DBservices/workers.type.service';
import { WorkersType } from 'src/DBtables/workers.type';
import { WorkersTypeDto } from 'src/Mapper/DTO/workers.type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AWService } from 'src/DBservices/aws.service';

@Controller('workers-type')
export class WorkersTypeController {
    constructor(private readonly workersService: WorkersTypeService,
        private readonly awsSetvice: AWService) { }

    @Get()
    @UseGuards(AuthGuard)
    async findAllWorkerTypes(): Promise<WorkersType[]> {
        return this.workersService.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async findWorkerTypeById(@Param('id') id: number): Promise<WorkersTypeDto> {
        return this.workersService.getById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createWorkerType(@Body("position") position: string, @Body("description") description: string, @UploadedFile("file") file: Express.Multer.File): Promise<WorkersTypeDto> {
        const icon = await this.awsSetvice.uploadIcon(file, position)
        return this.workersService.create({ position, description, "iconPath": icon.iconPath, "iconURL": icon.iconURL });
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateWorkerType(@Param('id') id: number, @Body("position") position: string, @Body("description") description: string, @UploadedFile() file: Express.Multer.File): Promise<WorkersTypeDto> {
        const icon = await this.awsSetvice.uploadIcon(file, position)
        return this.workersService.update({ id, position, description, "iconPath": icon.iconPath, "iconURL": icon.iconURL });
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteWorkerType(@Param('id') id: number): Promise<void> {
        return this.workersService.delete(id);
    }
}