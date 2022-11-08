import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { KafkaService } from './service/kafka.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KafkaClient',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: process.env.KAFKA_CONNECTION.split(','),
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
