import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/DBtables/user';
import * as utils from '../../Utils/utils'
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/enum/enum.user';
import { BaseService } from 'src/DBservices/generic.service';
import { UserDto } from 'src/Mapper/DTO/user.dto';
import { UserMapper } from 'src/Mapper/EntityMappers/user.mapper';
import * as jwt from 'jsonwebtoken';
import { UsersInChats } from 'src/DBtables/users.in.chats';
import { Chats } from 'src/DBtables/chats';


@Injectable()
export class UserAuthService extends BaseService<User, UserDto> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly userMapper: UserMapper,
    ) { super(userRepository, userMapper) }

    async createAdmin(email: string, password: string): Promise<User> {
        const isEmailExists = await this.isEmailExists(email)
        if (isEmailExists !== null) {
            throw new Error('ADMIN already exists');
        }
        const newUser = this.userRepository.create({ email, password: password, type: UserRole.ADMIN });
        return this.userRepository.save(newUser);
    }

    async isEmailExists(email: string) {
        const isExists = this.userRepository.createQueryBuilder('user')
            .where("user.email = :email", { email })
            .getOne();
        return isExists
    }

    async signIn(email: string, password: string) {
        const user = await this.isEmailExists(email);
        password = utils.hashPassword(password)
        if (!user || user.password !== password) {
            throw Error('Invalid credentials');
        }
        const id = user.id
        const payload = { email, id };
        const token = this.jwtService.sign(payload);
        return { token };
    }

    async getGroupsOfUser(id: number) {  
        const chats = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin(UsersInChats, 'usersInChats', 'user.id = usersInChats.userId')
        .innerJoin(Chats, 'chats', 'usersInChats.chatId = chats.id')
        .where('user.id = :id', { id: id })
        .select('chats.chatName,chats.id','chatId') 
        .orderBy('chats.id')
        .execute();
        return chats
    }
}