import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Ingredient } from '../entities/ingredients.entity';

export class CreateRecipeDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  duration: string;
  image: string;
  @MaxLength(300)
  description: string;
  ingredients: string;
}
