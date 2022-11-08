import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UserRejectEvent {
  @IsNotEmpty()
  @IsString()
  requestUserId: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsDateString()
  rejectTime: Date;
}
