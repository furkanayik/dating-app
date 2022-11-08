import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppLogger } from '../../logger/app-logger.service';
import { ActionHistoryService } from '../services/action-history.service';
import { UserRejectEvent } from '../_models/dtos/user-reject-event.dto';
import { UserRequestEvent } from '../_models/dtos/user-request-event.dto';

import { UsersMatchedEvent } from '../_models/dtos/users-matched-event.dto';

@Controller()
export class ActionHistoryConsumer {
  constructor(
    private actionHistoryService: ActionHistoryService,
    private readonly logger: AppLogger,
  ) {}

  @EventPattern(process.env.KAFKA_DATING_BACKEND_CONSUME_TOPIC)
  async readMessage(@Payload() payload: any) {
    this.logger.log(
      `received dating backend event: ${JSON.stringify(payload)}`,
    );
    try {
      const event = payload.value;
      const eventType = Object.keys(event)[0];
      let eventData;
      switch (eventType) {
        case 'users_matched':
          eventData = plainToClass(UsersMatchedEvent, event.users_matched);
          this.logger.log(
            `processing users_matched event: ${JSON.stringify(eventData)}`,
          );
          await validateOrReject(eventData);
          await this.actionHistoryService.createMatchHistory(eventData);
          break;
        case 'user_requested':
          eventData = plainToClass(UserRequestEvent, event.user_requested);
          this.logger.log(
            `processing user_requested event: ${JSON.stringify(eventData)}`,
          );
          await validateOrReject(eventData);
          await this.actionHistoryService.createRequestHistory(eventData);
          break;
        case 'user_rejected':
          eventData = plainToClass(UserRejectEvent, event.user_rejected);
          this.logger.log(
            `processing user_rejected event: ${JSON.stringify(eventData)}`,
          );
          await validateOrReject(eventData);
          await this.actionHistoryService.createRejectHistory(eventData);
          break;
      }
    } catch (e) {
      this.logger.warn(
        `Error while consuming event in topic ${
          process.env.KAFKA_DATING_BACKEND_CONSUME_TOPIC
        }: ${JSON.stringify(payload)}`,
        e,
      );
    }
  }
}
