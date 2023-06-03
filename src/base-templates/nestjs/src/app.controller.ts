import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiQuery,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { User, UserType } from './users/entities/user.entity';
import { Auth } from './auth/_decorators/auth.decorator';

class LoginResponse {
  access_token: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  //Protected route
  @Get('protected')
  @ApiOperation({
    summary: 'Example of a proctected endpoint. All logged in users can access',
  })
  @Auth()
  protected(@Request() req): string {
    return req.user;
  }

  //Protected route
  @Get('protected-OnlyAdmin')
  @ApiOperation({
    summary: 'Example of a proctected endpoint. Only admins can access',
  })
  @Auth(UserType.Admin)
  protectedAdmin(@Request() req): string {
    return req.user;
  }

  //Protected route
  @Get('protected-OnlyUser')
  @ApiOperation({
    summary: 'Example of a proctected endpoint. Only normal user can access',
  })
  @Auth(UserType.User)
  protectedUser(@Request() req): string {
    return req.user;
  }
}
