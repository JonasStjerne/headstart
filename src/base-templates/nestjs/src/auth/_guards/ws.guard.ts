import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: any): Promise<boolean> {
    const basicToken = context.args[0].handshake.headers.authorization
      .split(' ')[1]
      .split('.');
    const [id, secret, ...rest] = basicToken;
    if (!id || !secret) {
      return false;
    }
    const hub = await this.authService.validateHub(id, secret);
    if (!hub) {
      return false;
    }
    context.switchToHttp().getRequest().hub = hub;
    return true;
  }
}
