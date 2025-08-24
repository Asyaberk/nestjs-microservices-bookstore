import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
//swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // HTTP APP

  // Swagger, cookie, cors (sadece HTTP için)
  const config = new DocumentBuilder()
    .setTitle('📚 Library Service API')
    .setDescription(
      'This service handles book rentals, returns, and library operations.',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3030', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.LIBRARY_PORT ?? 3030);

  //Kafka consumer microservicei bağla
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'] },
      consumer: { groupId: 'library-consumer' },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();