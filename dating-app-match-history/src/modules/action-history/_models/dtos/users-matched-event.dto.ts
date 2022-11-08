import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UsersMatchedEvent {
  @IsNotEmpty()
  @IsString()
  requestUserId: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsDateString()
  matchTime: Date;
}
