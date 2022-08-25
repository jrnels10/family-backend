import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  auth0Id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
