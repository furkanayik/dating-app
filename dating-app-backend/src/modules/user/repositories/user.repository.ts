import { Injectable } from '@nestjs/common';
import { Prisma, UserRelationTypes } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateUserBody } from '../_models/dtos/create-user.dto';
import { GetUsersFilter } from '../_models/dtos/get-users-filter.dto';
import { UserModel } from '../_models/dtos/userData.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUser: CreateUserBody) {
    return this.prismaService.user.create({
      data: {
        userId: uuidv4(),
        name: createUser.name,
        lastName: createUser.lastName,
        age: createUser.age,
        language: createUser.language,
        gender: createUser.gender,
        attractedTo: createUser.attractedTo,
      },
    });
  }

  async getUser(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });
  }

  async getUsers(getUserFilter: GetUsersFilter) {
    const whereClause: Prisma.UserWhereInput = {};
    if (getUserFilter.language) {
      whereClause.language = getUserFilter.language;
    }

    if (getUserFilter.gender) {
      whereClause.gender = getUserFilter.gender;
    }

    if (getUserFilter.attractedTo) {
      whereClause.attractedTo = getUserFilter.attractedTo;
    }

    if (getUserFilter.age) {
      whereClause.age = {
        lte: getUserFilter.age.maxAge,
        gte: getUserFilter.age.minAge,
      };
    }

    return this.prismaService.user.findMany({
      where: whereClause,
      take: 30,
    });
  }

  async searchUsers(searchingUser: UserModel) {
    return this.prismaService.user.findMany({
      where: {
        userId: {
          not: searchingUser.userId,
        },
        gender: searchingUser.attractedTo,
        attractedTo: searchingUser.gender,
        passiveUserRelations: {
          none: {
            requestUserId: searchingUser.userId,
            relationStatus: {
              in: [UserRelationTypes.REQUESTED, UserRelationTypes.MATCHED],
            },
          },
        },
        activeUserRelations: {
          none: {
            targetUserId: searchingUser.userId,
            relationStatus: {
              in: [UserRelationTypes.REJECTED, UserRelationTypes.MATCHED],
            },
          },
        },
      },
      take: 30,
    });
  }

  async createMatchRequest(requestUserId: string, targetUserId: string) {
    return this.prismaService.userMatchRequest.create({
      data: {
        requestUserId,
        targetUserId,
      },
    });
  }

  async getMatchRequest(requestUserId: string, targetUserId: string) {
    return this.prismaService.userMatchRequest.findUnique({
      where: {
        requestUserId_targetUserId: {
          requestUserId,
          targetUserId,
        },
      },
    });
  }

  async upsertUserRelation(
    requestUserId: string,
    targetUserId: string,
    isRequested: boolean,
    isRejected: boolean,
  ) {
    let relationStatus: UserRelationTypes = UserRelationTypes.MATCHED;
    if (isRejected) {
      relationStatus = UserRelationTypes.REJECTED;
    } else if (isRequested) {
      relationStatus = UserRelationTypes.REQUESTED;
    }
    return this.prismaService.userRelation.upsert({
      where: {
        requestUserId_targetUserId: {
          requestUserId,
          targetUserId,
        },
      },
      create: {
        requestUserId,
        targetUserId,
        relationStatus: relationStatus,
      },
      update: {
        requestUserId,
        targetUserId,
        relationStatus: relationStatus,
      },
    });
  }
}
