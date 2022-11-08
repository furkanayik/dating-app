import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { CreateUserBody } from '../_models/dtos/create-user.dto';
import { GetUsersFilter } from '../_models/dtos/get-users-filter.dto';
import { MatchBody } from '../_models/dtos/match-body.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @HttpCode(200)
  async createUser(@Body() createUser: CreateUserBody) {
    return await this.userService.createUser(createUser);
  }

  @Get('/:userId')
  @HttpCode(200)
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Post('/get-users')
  @HttpCode(200)
  async getUsers(@Body() getUsersFilter: GetUsersFilter) {
    return await this.userService.getUsers(getUsersFilter);
  }

  @Get('/:userId/search-users')
  @HttpCode(200)
  async searchUsers(@Param('userId') userId: string) {
    return await this.userService.searchUsers(userId);
  }

  @Post('/:userId/match-request')
  @HttpCode(201)
  async matchRequest(
    @Param('userId') userId: string,
    @Body() matchRequest: MatchBody,
  ) {
    return await this.userService.matchRequest(
      userId,
      matchRequest.targetUserId,
    );
  }

  @Post('/:userId/match-reject')
  @HttpCode(201)
  async matchReject(
    @Param('userId') userId: string,
    @Body() matchReject: MatchBody,
  ) {
    return await this.userService.matchReject(userId, matchReject.targetUserId);
  }
}
