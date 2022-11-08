import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { UserRequestEvent } from '../../user/_models/dtos/user-request-event.dto';
import { UserRejectEvent } from '../../user/_models/dtos/user-reject-event.dto';
import { UsersMatchedEvent } from '../../user/_models/dtos/users-matched-event.dto';
import { AppLogger } from '../../logger/app-logger.service';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KafkaClient') private readonly kafkaClient: ClientKafka,
    private configService: ConfigService,
    private readonly logger: AppLogger,
  ) {}

  public async emitUsersMatched(usersMatchedEvent: UsersMatchedEvent) {
    const result = await lastValueFrom(
      this.kafkaClient.emit(
        this.configService.get<string>('KAFKA_PUBLISH_TOPIC'),
        {
          key: `${usersMatchedEvent.requestUserId}-${usersMatchedEvent.targetUserId}`,
          value: {
            users_matched: {
              ...usersMatchedEvent,
            },
          },
        },
      ),
    );
    this.logger.log(`Emitted message: ${JSON.stringify(result)}`);
  }

  public async emitUserRequest(userRequestEvent: UserRequestEvent) {
    const result = await lastValueFrom(
      this.kafkaClient.emit(
        this.configService.get<string>('KAFKA_PUBLISH_TOPIC'),
        {
          key: `${userRequestEvent.requestUserId}-${userRequestEvent.targetUserId}`,
          value: {
            user_requested: {
              ...userRequestEvent,
            },
          },
        },
      ),
    );
    this.logger.log(`Emitted message: ${JSON.stringify(result)}`);
  }

  public async emitUserReject(userRejectEvent: UserRejectEvent) {
    const result = await lastValueFrom(
      this.kafkaClient.emit(
        this.configService.get<string>('KAFKA_PUBLISH_TOPIC'),
        {
          key: `${userRejectEvent.requestUserId}-${userRejectEvent.targetUserId}`,
          value: {
            user_rejected: {
              ...userRejectEvent,
            },
          },
        },
      ),
    );
    this.logger.log(`Emitted message: ${JSON.stringify(result)}`);
  }
}
