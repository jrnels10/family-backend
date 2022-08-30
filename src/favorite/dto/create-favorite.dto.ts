import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateFavoriteDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  recipe: Recipe;
}
