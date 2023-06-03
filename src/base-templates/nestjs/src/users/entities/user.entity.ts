import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Hub } from '../../hub/entities/hub.entity';

export enum UserType {
  Admin = 1,
  User = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType;

  @ManyToMany(() => Hub, (hub) => hub.users, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  hubs: Hub[];
}
