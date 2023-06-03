import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/_decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOneBy(createUserDto.username)) {
      throw new ConflictException('User already exists');
    }
    return await this.userService.create(createUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete users own acount' })
  @ApiBearerAuth()
  @Auth()
  async delete(@Request() req) {
    return await this.userService.remove(req.user.id);
  }
}
