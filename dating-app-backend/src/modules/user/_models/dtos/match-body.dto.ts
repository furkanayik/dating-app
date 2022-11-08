import { IsNotEmpty, IsString } from 'class-validator';

export class MatchBody {
  @IsString()
  @IsNotEmpty()
  targetUserId: string;
}
