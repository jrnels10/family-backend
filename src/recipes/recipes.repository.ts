import { Repository, DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import moment from 'moment';

@Injectable()
export class RecipesRepository extends Repository<Recipe> {
  constructor(private dataSource: DataSource) {
    super(Recipe, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  async createNewRecipe(createRecipeDto: CreateRecipeDto, user: User) {
    const created = moment().format('YYYY-MM-DD HH:mm:ss');
    const newRecipe = this.create({ ...createRecipeDto, created, user });
    return this.save(newRecipe);
    // return await this.createQueryBuilder()
    //   .insert()
    //   .into(Recipe)
    //   .values([{ ...createRecipeDto, user }])
    //   .returning('id')
    //   .execute();
  }

  async findManyAndCount(skip = 0) {
    const found = await this.createQueryBuilder('recipe')
      .loadRelationCountAndMap('recipe.favoriteCount', 'recipe.favorites')
      .skip(skip)
      .take(15)
      .getMany();
    return found;
  }

  async findOneAndCount(id: number) {
    const found = await this.createQueryBuilder('recipe')
      .loadRelationCountAndMap('recipe.favoriteCount', 'recipe.favorites')
      .where('recipe.id = :id', { id })
      .getMany();
    return found;
  }
}
