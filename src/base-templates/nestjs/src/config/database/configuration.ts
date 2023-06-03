import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class databaseConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/entities/*.entity.js'],
      synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
      migrations: ['dist/migrations/*.js'],
      // subscribers: ['dist/*/*.subscriber.js'],
      // cli: {
      //   migrationsDir: 'migrations',
      // },
    };
  }
}
