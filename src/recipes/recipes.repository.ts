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

  async createNewRecipe(createRecipeDto: CreateRecipeDto) {
    const { title, duration, description } = createRecipeDto;
    const queryParams = [title, duration, description];
    const queryString = `INSERT INTO public.recipe(title, duration,description)
          VALUES($1,$2,$3)`;
    const res = await this.query(queryString, queryParams);
    console.log(res);
    return res;
  }
}
