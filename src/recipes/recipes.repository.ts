import { Repository, DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RecipesRepository extends Repository<Recipe> {
  constructor(private dataSource: DataSource) {
    super(Recipe, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  async createNewRecipe(createRecipeDto: CreateRecipeDto, user: User) {
    return await this.createQueryBuilder()
      .insert()
      .into(Recipe)
      .values([{ ...createRecipeDto, user }])
      .returning('id')
      .execute();
  }
}
