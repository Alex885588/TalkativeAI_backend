import { Injectable } from '@nestjs/common';
import { User } from 'src/DBtables/user';
import { UserRole } from 'src/enum/enum.user';
import { UserDto } from '../DTO/user.dto';
import { BaseMapper } from './base.mapper';

@Injectable()
export class UserMapper extends BaseMapper<User, UserDto>{
    toDto(user: User): UserDto {
        const userDto = new UserDto();
        userDto.id=user.id
        userDto.email = user.email;
        userDto.type = user.type;
        return userDto;
    }

    toEntity(userDto: UserDto): User {
        const user = new User();
        user.id = userDto.id;
        user.email = userDto.email;
        user.password = userDto.password;
        user.type=UserRole.USER
        return user;
    }
}
