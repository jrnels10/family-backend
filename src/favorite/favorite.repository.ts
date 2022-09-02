import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
  constructor(private dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager());
  }
  async mostPopular() {
    return await this.query(`select *
    from recipe
    where id in (
            SELECT f."recipeId" AS recipeCount FROM favorite f GROUP BY 1 LIMIT 3
      )`);
  }

  async createNewFavorite(createFavoriteDto: CreateFavoriteDto) {
    const { recipe, user } = createFavoriteDto;
    const newFavorite = new Favorite();
    newFavorite.recipe = recipe;
    newFavorite.user = user;
    return await this.dataSource.manager.save(newFavorite);
  }
}
