import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserAuthService } from '../Authservice/auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.MY_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
