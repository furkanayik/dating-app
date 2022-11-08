import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

import { AppModule } from './app.module';
import { PrismaService } from './modules/prisma/service/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env.KAFKA_CONNECTION.split(','),
        clientId: process.env.KAFKA_CLIENT_ID,
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
    },
  });
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
