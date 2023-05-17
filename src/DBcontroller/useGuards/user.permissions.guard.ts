import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthService } from 'src/Auth/Authservice/auth.service';
import { WorkersService } from 'src/DBservices/workers.service';
import { UserRole } from 'src/enum/enum.user';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private userService: UserAuthService, private workersService: WorkersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const id = context.switchToHttp().getRequest().body.id;
            const user = await this.workersService.isWorkerExistsForUser(request.user.id, id)
            if (user) {
                return true
            }
            return false
        } catch (err) {
            return false;
        }
    }
}
