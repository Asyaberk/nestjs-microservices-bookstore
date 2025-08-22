import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('🔐 Auth Service API')
    .setDescription(
      'This service handles authentication, login/register, and JWT operations. Part of the NestJS Microservices Bookstore project.',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Cookie parser
  app.use(cookieParser());

  // Enable CORS (API Gateway will call this service)
  app.enableCors({
    origin: 'http://localhost:3010',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.AUTH_PORT ?? 3060);
}
bootstrap();
