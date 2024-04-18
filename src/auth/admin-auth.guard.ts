import { Injectable, UnauthorizedException, CanActivate, ExecutionContext  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing JWT token');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
       
      if (decodedToken.role !== 'admin') {
        throw new UnauthorizedException('Invalid role');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}