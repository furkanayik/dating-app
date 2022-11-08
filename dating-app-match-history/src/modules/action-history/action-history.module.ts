import { Module } from '@nestjs/common';

import { ActionHistoryConsumer } from './event-consumers/action-history-consumer.controller';
import { ActionHistoryRepository } from './repositories/action-history.repository';
import { ActionHistoryService } from './services/action-history.service';

@Module({
  controllers: [ActionHistoryConsumer],
  providers: [ActionHistoryService, ActionHistoryRepository],
  exports: [],
})
export class ActionHistoryModule {}
