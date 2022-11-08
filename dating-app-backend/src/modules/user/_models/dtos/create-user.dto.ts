import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { UserGender } from '../enum/genders.enum';

export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsEnum(UserGender)
  attractedTo: UserGender;
}
