import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotFoundInterceptor } from './_interceptors/not-found.interceptor';
import { AppModule } from './app.module';

import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: new CustomLogger(),
    rawBody: true,
  });
  app.enableCors({
    allowedHeaders: ['Content-type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    origin: '*',
    credentials: true,
  });

  //Swagger global setup at /api
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  //Save openapi spec for application if devlopment
  process.env.NODE_ENV == 'development'
    ? fs.writeFileSync('/shared/openapi-spec.json', JSON.stringify(document))
    : null;

  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  //Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //Global Interceptors
  //If entity not found, return http not found
  app.useGlobalInterceptors(new NotFoundInterceptor());

  //Remove @Exclude() from response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //HoneyBadger for error tracking and app monitoring
  // Honeybadger.configure({ apiKey: process.env.HONEYBADGER_API_KEY });

  //Listen on port 3000
  await app.listen(
    process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3000,
  );
}
bootstrap();
