import { Repository, DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesRepository extends Repository<Recipe> {
  constructor(private dataSource: DataSource) {
    super(Recipe, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  async createNewRecipe(createRecipeDto: CreateRecipeDto, auth0Id: string) {
    return await this.createQueryBuilder()
      .insert()
      .into(Recipe)
      .values([{ ...createRecipeDto, user_id: auth0Id }])
      .returning('id')
      .execute();
  }

  getRecipeById;
}
