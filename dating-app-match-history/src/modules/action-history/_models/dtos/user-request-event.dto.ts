import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UserRequestEvent {
  @IsNotEmpty()
  @IsString()
  requestUserId: string;

  @IsNotEmpty()
  @IsString()
  targetUserId: string;

  @IsNotEmpty()
  @IsDateString()
  requestTime: Date;
}
