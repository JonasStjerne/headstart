import { PickType } from '@nestjs/mapped-types';
import { Hub } from '../hub/entities/hub.entity';
import { User } from '../users/entities/user.entity';

export interface AuthRequest extends Request {
  user: AuthUser;
}

export class AuthUser {
  username: User['username'];
  id: User['id'];
  userType: User['userType'];
}

export interface IJwtPayload {
  sub: User['id'];
  username: User['username'];
  userType: User['userType'];
}

export class IAuthHub extends PickType(Hub, [
  'id',
  'name',
  'socketId',
] as const) {}
