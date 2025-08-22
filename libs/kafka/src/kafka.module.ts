import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { KafkaConsumerService } from './services/kafka.consumer.service';
import { KafkaProducerService } from './services/kafka.producer.service';
import { KafkaService } from './services/kafka.service';
import { TestConsumer } from './consumer';

@Module({
  imports: [AppConfigModule],
  providers: [KafkaService, KafkaConsumerService, KafkaProducerService, TestConsumer],
exports: [KafkaService, KafkaConsumerService, KafkaProducerService, TestConsumer],
})
export class KafkaModule {}
