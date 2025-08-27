import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios'; 
import { ApiGatewayLibraryController } from './controllers/api-gateway.library.controller';
import { ApiGatewayLibraryService } from './services/api-gateway.library.service';
import { Partitioners } from 'kafkajs';
import { ApiGatewayUsersController } from './controllers/api-gateway.users.controller';
import { ApiGatewayUsersService } from './services/api-gateway.users.service';
import { ApiGatewayRolesController } from './controllers/api-gateway.roles.controller';
import { ApiGatewayRolesService } from './services/api-gateway.roles.service';
import { ApiGatewayBooksController } from './controllers/api-gateway.books.controller';
import { ApiGatewayBooksService } from './services/api-gateway.books.service';

//dont forget to export NODE_OPTIONS="--trace-warnings" before start
@Module({
  imports: [
    HttpModule.register({
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
    ClientsModule.register([
      {
        name: 'ROLES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gateway-roles-client',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
            producer: { createPartitioner: Partitioners.LegacyPartitioner },
          },
          consumer: {
            groupId: 'gateway-roles-consumer-client',
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gateway-books-client',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
            producer: { createPartitioner: Partitioners.LegacyPartitioner },
          },
          consumer: {
            groupId: 'gateway-books-consumer-client',
          },
        },
      },
    ]),
  ],
  controllers: [
    ApiGatewayLibraryController,
    ApiGatewayUsersController,
    ApiGatewayRolesController,
    ApiGatewayBooksController,
  ],
  providers: [
    ApiGatewayLibraryService,
    ApiGatewayUsersService,
    ApiGatewayRolesService,
    ApiGatewayBooksService,
  ],
})
export class ApiGatewayModule {}
