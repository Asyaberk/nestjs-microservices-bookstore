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
     .setTitle('📚 Library Service API')
     .setDescription(
       'This service handles book rentals, returns, and library operations. Part of the NestJS Microservices Bookstore project.',
     )
     .setVersion('1.0.0')
     .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //cookie
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3030',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  //for dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.LIBRARY_PORT ?? 3030);
}
bootstrap();
