import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Messages } from '../DBtables/messages';
import { MessagesService } from 'src/DBservices/message.service';
import { AuthGuard } from 'src/Auth/Guard/auth.guard';
import { AdminAuthGuard } from './useGuards/admin.auth.guard';
import { MessagesDto } from 'src/Mapper/DTO/messages.dto';
import { WorkersService } from 'src/DBservices/workers.service';
import { Workers } from 'src/DBtables/workers';
import { WorkersDto } from 'src/Mapper/DTO/workers.dto';
import { UserPermissionsGuard } from './useGuards/user.permissions.guard';

@Controller('workers')
export class WorkersController {
    constructor(private readonly workersService: WorkersService) { }

    @Get()
    @UseGuards(AuthGuard)
    async findAllWorker(): Promise<Workers[]> {
        return this.workersService.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findWorkerById(@Param('id') id: number): Promise<WorkersDto> {
        return this.workersService.getById(id);
    }

    @Post('activeServices')
    @UseGuards(AuthGuard)
    async findActiveServices(@Body('userId') userId: number): Promise<WorkersDto[]> {
        return this.workersService.getWorkerByUserIdAndTypeId(userId);
    }

    @Post('isExists')
    @UseGuards(AuthGuard)
    async isWorkerExistsForUser(@Body('userId') userId: number, @Body('workerTypeId') workerTypeId: number): Promise<Boolean> {
        return this.workersService.isWorkerExistsForUser(userId, workerTypeId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createWorker(@Body("name") name: string, @Body("data") data: Record<any, any>, @Body("userId") userId: number, @Body("workerTypeId") workerTypeId: number): Promise<WorkersDto> {
        return this.workersService.create({ name, data, userId, workerTypeId });
    }

    @Put(':id')
    @UseGuards(AuthGuard,UserPermissionsGuard)
    async updateWorker(@Param('id') id: number, @Body("name") name: string, @Body("data") data: Record<any, any>, @Body("userId") userId: number, @Body("workerTypeId") workerTypeId: number): Promise<WorkersDto> {
        return this.workersService.update({ id, name, data, userId, workerTypeId });
    }

    @Delete()
    @UseGuards(AuthGuard, UserPermissionsGuard)
    async deleteWorker(@Body('id') id: number): Promise<void> {
        return this.workersService.delete(id);
    }
}