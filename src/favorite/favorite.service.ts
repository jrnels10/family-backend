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
    const user = await this.userRepository.findOneBy({ auth0Id });
    const favorited = await this.favoriteRepository.findOneBy({
      userId: user.id,
      recipeId: id,
    });
    if (favorited) {
      return this.remove(favorited.id);
    }
    const recipe = await this.recipeRepository.findOneBy({ id });
    if (user && recipe) {
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

  async remove(id: number) {
    return await this.favoriteRepository.delete(id);
  }
}
