import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
  constructor(private dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  async createNewFavorite(createFavoriteDto: CreateFavoriteDto) {
    console.log(createFavoriteDto);
    const { user_id, recipeId } = createFavoriteDto;
    const newFavorite = new Favorite();
    newFavorite.user = user_id;
    // newFavorite.recipe = recipeId;
    return await this.dataSource.manager.save(newFavorite);
  }
}
