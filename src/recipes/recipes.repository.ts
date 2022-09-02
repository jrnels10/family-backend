import { Repository, DataSource, SelectQueryBuilder } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import moment from 'moment';
import { Favorite } from 'src/favorite/entities/favorite.entity';

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

  async mostPopular() {
    return await this.query(`SELECT fav.id, recipeCount, title, image, userId
    FROM (
      SELECT *
      FROM (
            SELECT f."recipeId" AS id, count(*) AS recipeCount 
        FROM favorite f 
        GROUP BY f."recipeId" 
        ORDER BY COUNT(id) 
        DESC 
        LIMIT 3
        ) as subFav
      ) as fav, recipe
    WHERE fav.id = recipe.id
    ORDER BY recipeCount
    DESC`);
  }

  async findOneAndCount(id: number) {
    const found = await this.query(
      `SELECT COALESCE(
      ( SELECT true
          FROM favorite f
         WHERE f."userId" = 2 
   AND f."recipeId" = $1
      ), false ) AS userLiked,
    r.*
FROM recipe r
where r.id = $1`,
      [id],
    );
    // const found = await this.createQueryBuilder('recipe')
    //   .loadRelationCountAndMap('recipe.favoriteCount', 'recipe.favorites')
    //   .where((qb: SelectQueryBuilder<Favorite>) => {
    //     qb.where(
    //       `recipe.id in ` +
    //         qb
    //           .subQuery()
    //           .select('fav.id')
    //           .where('fav.id = :userId', { userId: 11 })
    //           .from(Favorite, 'fav')
    //           .getQuery(),
    //     );
    //   })
    //   // .where((qb) => {
    //   //   const subQuery = qb
    //   //     .subQuery()
    //   //     .select('fav.id')
    //   //     .from(Favorite, 'fav')
    //   //     .where('fav.userId = 2')
    //   //     .getQuery();
    //   //   return 'recipe.userId IN ' + subQuery;
    //   // })
    //   .andWhere('recipe.id = :id', { id })
    //   .getMany();
    return found;
  }
}
