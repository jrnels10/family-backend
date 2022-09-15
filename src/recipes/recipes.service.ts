import { Injectable } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { UsersRepository } from 'src/users/users.repository';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FavoriteRepository } from './favorite.repository';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeRepository: RecipesRepository,
    private readonly userRepository: UsersRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly imageService: ImagesService,
  ) {}
  async create(image: any, createRecipeDto: CreateRecipeDto, auth0Id: string) {
    const user = await this.userRepository.findOneBy({ auth0Id });
    let imageKey = null;
    if (user) {
      if (image) {
        imageKey = await this.imageService.create(image);
      }
      return await this.recipeRepository.createNewRecipe(
        { ...createRecipeDto, image: imageKey },
        user,
      );
    }
    return 'error';
  }

  findAll(skip: number, term: string) {
    return this.recipeRepository.findManyAndCount(skip, term);
    // return this.recipeRepository.find({
    //   take: 5,
    //   skip,
    // });
  }

  async findOne(id: number) {
    return this.recipeRepository.findOneAndCount(id);
    // return await this.recipeRepository.find({
    //   where: { id },
    //   relations: ['favorites'],
    // });
  }

  async findMostPopular() {
    return await this.recipeRepository.mostPopular();
  }

  async likeRecipe(id, auth0Id) {
    const user = await this.userRepository.findOneBy({ auth0Id });
    const favorited = await this.favoriteRepository.findOneBy({
      userId: user.id,
      recipeId: id,
    });
    if (favorited) {
      await this.favoriteRepository.delete(favorited.id);
      return await this.recipeRepository.findOneBy({ id });
    }
    const recipe = await this.recipeRepository.findOneBy({ id });
    if (user && recipe) {
      const createFavoriteDto = { user, recipe };
      return this.favoriteRepository.createNewFavorite(createFavoriteDto);
    }
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe test`;
  }
}
