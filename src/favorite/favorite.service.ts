import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/recipes/recipes.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly recipeRepository: RecipesRepository,
    private readonly userRepository: UsersRepository,
  ) {}
  async create(id: number, auth0Id: string) {
    console.log(id);
    const user = await this.userRepository.findOneBy({ auth0Id });
    const recipe = await this.recipeRepository.findOneBy({ id });
    if (user) {
      const createFavoriteDto = { user, recipe };
      return this.favoriteRepository.createNewFavorite(createFavoriteDto);
    }
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateSocialDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
