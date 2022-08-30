import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeRepository: RecipesRepository,
    private readonly userRepository: UsersRepository,
  ) {}
  async create(createRecipeDto: CreateRecipeDto, auth0Id: string) {
    const user = await this.userRepository.findOneBy({ auth0Id });
    if (user) {
      return await this.recipeRepository.createNewRecipe(createRecipeDto, user);
    }
    return 'error';
  }

  findAll() {
    return `This action returns all recipes`;
  }

  async findOne(id: number) {
    return await this.recipeRepository.find({
      where: { id },
      relations: ['favorites'],
    });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
