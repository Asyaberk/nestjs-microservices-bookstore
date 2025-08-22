import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
//swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //for swagger
  const config = new DocumentBuilder()
    .setTitle('🛡️ Roles Service API')
    .setDescription(
      'This service manages user roles and role-based access control (RBAC). Part of the NestJS Microservices Bookstore project.',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //cookie
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3050',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  //for dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.ROLES_PORT ?? 3050);
}
bootstrap();
