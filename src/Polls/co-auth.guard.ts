import {Injectable, CanActivate,ExecutionContext,ForbiddenException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
  



  @Injectable()
  export class ControllerAuthGuard implements CanActivate {
    
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      
  
      const { accessToken } = request.body;
  
      try {
        const payload = this.jwtService.verify(accessToken);
        // append user and poll to socket
        request.userID = payload.sub;
        request.pollID = payload.pollID;
        request.name = payload.name;
        return true;
      } catch {
        throw new ForbiddenException('Invalid authorization token');
      }
    }
  }