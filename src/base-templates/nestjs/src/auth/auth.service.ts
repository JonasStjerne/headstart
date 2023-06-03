import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Hub } from '../hub/entities/hub.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthUser, IJwtPayload } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Hub) private hubsRepository: Repository<Hub>,
  ) {}

  async validateUser(
    username: User['username'],
    password: User['password'],
  ): Promise<AuthUser | null> {
    const user = await this.usersService.findOneBy(username);
    if (!user) {
      return null;
    }
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordIsMatch) {
      const { password, hubs, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: AuthUser): Promise<LoginResponse> {
    const payload = {
      sub: user.id,
      username: user.username,
      userType: user.userType,
    } as IJwtPayload;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateHub(id: Hub['id'], secret: Hub['secret']) {
    const hubDb = await this.hubsRepository.findOneBy({ id });
    if (hubDb && hubDb.secret == secret) {
      return hubDb;
    }
    return null;
  }
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;
}
