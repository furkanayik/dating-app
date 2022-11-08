import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthController } from './controllers/health/health.controller';
import { ActionHistoryModule } from './modules/action-history/action-history.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LoggerModule,
    ActionHistoryModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
