import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.JWT_SALT_ROUNDS!),
    );
    createUserDto.password = hash;
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findOneBy(username: User['username']): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: User['id']) {
    await this.usersRepository.delete({ id });
    return;
  }
}
