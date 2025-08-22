import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('🚪 API Gateway')
    .setDescription(
      'This is the API Gateway for the NestJS Microservices Bookstore project. It serves as the single entry point, forwarding requests to Books, Library, Users, and Roles services.',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cookie
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: 'http://localhost:3010',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // Global DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.API_GATEWAY_PORT ?? 3010);
}
bootstrap();
