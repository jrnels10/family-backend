import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  duration: string;
  @MaxLength(300)
  description: string;
}
