import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './controllers/health/health.controller';
import { KafkaModule } from './modules/kafka/kafka.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    LoggerModule,
    KafkaModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
