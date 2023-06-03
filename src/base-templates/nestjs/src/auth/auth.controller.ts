import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LocalAuthGuard } from './_guards/local-auth.guard';
import { AuthService, LoginResponse } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    type: LoginResponse,
  })
  @ApiOperation({ summary: 'Login to get users access token' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
