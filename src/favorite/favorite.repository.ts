import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
  constructor(private dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  async createNewFavorite(createFavoriteDto: CreateFavoriteDto) {
    const { recipe, user } = createFavoriteDto;
    const newFavorite = new Favorite();
    newFavorite.recipes = recipe;
    newFavorite.user = user;
    return await this.dataSource.manager.save(newFavorite);
  }
}
