import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthService } from 'src/Auth/Authservice/auth.service';
import { UserRole } from 'src/enum/enum.user';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private userService: UserAuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = await this.userService.getById(request.user.id)
      if (user.type === UserRole.ADMIN) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
