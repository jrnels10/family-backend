import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@GetUser() user, @Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto, user.sub);
  }
  @Get()
  getHello() {
    return 'hello';
  }
  // @UseGuards(AuthorizationGuard)
  // @Get()
  // findAll() {
  //   return this.recipesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recipesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
  //   return this.recipesService.update(+id, updateRecipeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recipesService.remove(+id);
  // }
}
