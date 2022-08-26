import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  recipeId: number;
}
