import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { UserGender } from '../enum/genders.enum';

class AgeFilter {
  @IsOptional()
  @IsNumber()
  maxAge: number;

  @IsOptional()
  @IsNumber()
  minAge: number;
}

export class GetUsersFilter {
  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AgeFilter)
  age: AgeFilter;

  @IsOptional()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsEnum(UserGender)
  attractedTo: UserGender;
}
