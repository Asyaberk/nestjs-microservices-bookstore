import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios'; 
import { ApiGatewayLibraryController } from './controllers/api-gateway.library.controller';
import { ApiGatewayLibraryService } from './services/api-gateway.library.service';
import { Partitioners } from 'kafkajs';
import { ApiGatewayUsersController } from './controllers/api-gateway.users.controller';
import { ApiGatewayUsersService } from './services/api-gateway.users.service';

//dont forget to export NODE_OPTIONS="--trace-warnings" before start
@Module({
  imports: [
    HttpModule.register({
      baseURL:
        process.env.LIBRARY_URL ??
        `http://localhost:${process.env.LIBRARY_PORT ?? 3030}`,
      timeout: 5000,
      maxRedirects: 0,
    }),

    ClientsModule.register([
      {
        name: 'LIBRARY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gateway-library-client',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
            producer: { createPartitioner: Partitioners.LegacyPartitioner },
          },
          consumer: {
            groupId: 'gateway-library-consumer-client',
          },
        },
      },
    ]),
  ],
  controllers: [ApiGatewayLibraryController, ApiGatewayUsersController],
  providers: [ApiGatewayLibraryService, ApiGatewayUsersService],
})
export class ApiGatewayModule {}
