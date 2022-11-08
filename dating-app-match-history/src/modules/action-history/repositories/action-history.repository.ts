import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { UserRejectEvent } from '../_models/dtos/user-reject-event.dto';
import { UserRequestEvent } from '../_models/dtos/user-request-event.dto';
import { UsersMatchedEvent } from '../_models/dtos/users-matched-event.dto';

@Injectable()
export class ActionHistoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMatchHistory(usersMatchedEvent: UsersMatchedEvent) {
    await this.prismaService.userMatchHistory.create({
      data: {
        requestingUserId: usersMatchedEvent.requestUserId,
        targerUserId: usersMatchedEvent.targetUserId,
        matchTime: usersMatchedEvent.matchTime,
      },
    });
  }

  async createRequestHistory(userRequestHistory: UserRequestEvent) {
    await this.prismaService.userRequestHistory.create({
      data: {
        requestingUserId: userRequestHistory.requestUserId,
        targerUserId: userRequestHistory.targetUserId,
        requestTime: userRequestHistory.requestTime,
      },
    });
  }

  async createRejectHistory(userRejectEvent: UserRejectEvent) {
    await this.prismaService.userRejectHistory.create({
      data: {
        requestingUserId: userRejectEvent.requestUserId,
        targerUserId: userRejectEvent.targetUserId,
        rejectTime: userRejectEvent.rejectTime,
      },
    });
  }
}
