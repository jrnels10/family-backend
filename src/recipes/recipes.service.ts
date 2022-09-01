import { Injectable } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { UsersRepository } from 'src/users/users.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeRepository: RecipesRepository,
    private readonly userRepository: UsersRepository,
    private readonly imageService: ImagesService,
  ) {}
  async create(image: any, createRecipeDto: CreateRecipeDto, auth0Id: string) {
    const user = await this.userRepository.findOneBy({ auth0Id });
    if (user) {
      const imageKey = await this.imageService.create(image);
      return await this.recipeRepository.createNewRecipe(
        { ...createRecipeDto, image: imageKey },
        user,
      );
    }
    return 'error';
  }

  findAll(skip) {
    return this.recipeRepository.findManyAndCount(skip);
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

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
