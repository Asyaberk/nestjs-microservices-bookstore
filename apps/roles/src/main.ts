import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RolesModule } from './roles.module';
import * as cookieParser from 'cookie-parser';
//swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RolesModule);

  //for swagger
  const config = new DocumentBuilder()
    .setTitle('My Nestjs User Project')
    .setDescription('This is the API documentation of my internship project!')
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
  await app.listen(process.env.ROLES_PORT ?? 3050);
}
bootstrap();
