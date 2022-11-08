import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { KafkaService } from '../../kafka/service/kafka.service';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserBody } from '../_models/dtos/create-user.dto';
import { GetUsersFilter } from '../_models/dtos/get-users-filter.dto';
import { UserRejectEvent } from '../_models/dtos/user-reject-event.dto';
import { UserRequestEvent } from '../_models/dtos/user-request-event.dto';
import { UserModel } from '../_models/dtos/userData.dto';
import { UsersMatchedEvent } from '../_models/dtos/users-matched-event.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly kafkaService: KafkaService,
  ) {}

  async createUser(createUser: CreateUserBody) {
    return await this.userRepository.createUser(createUser);
  }

  async getUser(userId: string) {
    return await this.userRepository.getUser(userId);
  }

  async getUsers(getUsersFilter: GetUsersFilter) {
    return await this.userRepository.getUsers(getUsersFilter);
  }

  async searchUsers(userId: string) {
    const userData: UserModel = await this.userRepository.getUser(userId);
    return await this.userRepository.searchUsers(userData);
  }

  async matchRequest(requestUserId: string, targetUserId: string) {
    const existingRequest = await this.userRepository.getMatchRequest(
      targetUserId,
      requestUserId,
    );
    if (existingRequest) {
      const userMatchedEvent: UsersMatchedEvent = {
        requestUserId,
        targetUserId,
        matchTime: moment().toDate(),
      };
      await this.kafkaService.emitUsersMatched(userMatchedEvent);
      return await this.userRepository.upsertUserRelation(
        targetUserId,
        requestUserId,
        false,
        false,
      );
    } else {
      await this.userRepository.createMatchRequest(requestUserId, targetUserId);
      const userRequestEvent: UserRequestEvent = {
        requestUserId,
        targetUserId,
        requestTime: moment().toDate(),
      };
      await this.kafkaService.emitUserRequest(userRequestEvent);
      return await this.userRepository.upsertUserRelation(
        requestUserId,
        targetUserId,
        true,
        false,
      );
    }
  }

  async matchReject(userId: string, targetUserId: string) {
    const existingRequest = await this.userRepository.getMatchRequest(
      targetUserId,
      userId,
    );

    const userRejectEvent: UserRejectEvent = {
      requestUserId: userId,
      targetUserId,
      rejectTime: moment().toDate(),
    };
    await this.kafkaService.emitUserReject(userRejectEvent);

    if (existingRequest) {
      return await this.userRepository.upsertUserRelation(
        targetUserId,
        userId,
        false,
        true,
      );
    } else {
      return await this.userRepository.upsertUserRelation(
        userId,
        targetUserId,
        false,
        true,
      );
    }
  }
}
