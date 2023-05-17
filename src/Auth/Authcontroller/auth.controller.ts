import { Controller, Get, Param, Post, Body, Headers, Put, Delete, NotFoundException, InternalServerErrorException, UseGuards, Request, Res } from '@nestjs/common';
import { UserAuthService } from '../Authservice/auth.service';
import { User } from '../../DBtables/user';
import { AuthGuard } from '../Guard/auth.guard';
import { UserRole } from 'src/enum/enum.user';
import { AdminAuthGuard } from 'src/DBcontroller/useGuards/admin.auth.guard';
import * as utils from '../../Utils/utils'
import { UserDto } from 'src/Mapper/DTO/user.dto';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../Strategy/jwt-payload.interface';
@Controller('users')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userAuthService.getAll();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: number): Promise<UserDto> {
        const user = await this.userAuthService.getById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post('/register')
    async createUser(@Body('email') email: string, @Body('password') password: string, @Body('repeatPassword') repeatPassword: string): Promise<UserDto | boolean> {
        try {
            if (password !== repeatPassword) {
                throw Error("Invalid Password")
            }
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (!regex.test(email)) {
                throw Error('Unvalid Email');
            }
            let isExists = await this.userAuthService.isEmailExists(email)
            if (isExists !== null) {
                throw Error('User exists');
            }
            const hashedPassword = utils.hashPassword(password)
            return await this.userAuthService.create({ email, password: hashedPassword });
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    @Post('/register/admin')
    async createAdmin(@Body('email') email: string, @Body('password') password: string): Promise<UserDto> {
        try {
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (!regex.test(email)) {
                throw new Error('ADMIN Email');
            }
            const hashedPassword = utils.hashPassword(password)
            return await this.userAuthService.createAdmin(email, hashedPassword);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post('signin')
    async signIn(@Body() body) {
        try {
            const { email, password } = body;
            const result = await this.userAuthService.signIn(email, password);
            return result;
        } catch (error) {
            console.log(error.message)
            return false
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async updateUser(@Param('id') id: number, @Body('email') email: string, @Body('password') password: string, @Body('type') type: UserRole): Promise<UserDto> {
        const hashedPassword = utils.hashPassword(password)
        const user = await this.userAuthService.update({ id, email, password: hashedPassword, type });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminAuthGuard)
    async deleteUser(@Param('id') id: number): Promise<void> {
        try {
            await this.userAuthService.delete(id);
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    @Post('getId')
    @UseGuards(AuthGuard)
    async getId(@Headers('authorization') authorization: string) {
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.decode(token) as JwtPayload;
        return decodedToken.id;
    }

    @UseGuards(AuthGuard)
    @Post('validate-token')
    async validateToken() {
        return { valid: true };
    }

    @UseGuards(AuthGuard)
    @Post('getChats')
    async getChats(@Body('id') id: number) {
        return await this.userAuthService.getGroupsOfUser(id);
    }

}
