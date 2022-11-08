import { Injectable } from '@nestjs/common';
import { ActionHistoryRepository } from '../repositories/action-history.repository';
import { UserRejectEvent } from '../_models/dtos/user-reject-event.dto';
import { UserRequestEvent } from '../_models/dtos/user-request-event.dto';
import { UsersMatchedEvent } from '../_models/dtos/users-matched-event.dto';

@Injectable()
export class ActionHistoryService {
  constructor(
    private readonly actionHistoryRepository: ActionHistoryRepository,
  ) {}

  async createMatchHistory(usersMatchedEvent: UsersMatchedEvent) {
    this.actionHistoryRepository.createMatchHistory(usersMatchedEvent);
  }

  async createRequestHistory(userRequestEvent: UserRequestEvent) {
    this.actionHistoryRepository.createRequestHistory(userRequestEvent);
  }

  async createRejectHistory(userRejectEvent: UserRejectEvent) {
    this.actionHistoryRepository.createRejectHistory(userRejectEvent);
  }
}
