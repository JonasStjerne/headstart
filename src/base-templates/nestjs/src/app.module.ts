import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfigService } from './config/database/configuration';

@Module({
  imports: [
    // App module imports
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),

    //Setup TypeORM and connect to MySQL
    TypeOrmModule.forRootAsync({
      useClass: databaseConfigService,
      inject: [databaseConfigService],
    }),

    //Components
    AuthModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,

    //Use ratelimting guard on all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
