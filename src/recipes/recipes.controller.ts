import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @GetUser() user,
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.recipesService.create(image, { ...createRecipeDto }, user.sub);
  }

  @UseGuards(AuthorizationGuard)
  @Get('/popular')
  popularRecipes() {
    return this.recipesService.findMostPopular();
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  findAll(@GetUser() user, @Query('skip') skip?: number) {
    return this.recipesService.findAll(skip);
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  findOne(@GetUser() user, @Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @UseGuards(AuthorizationGuard)
  @Post('/like/:id')
  likeRecipe(@GetUser() user, @Param('id') id: number) {
    return this.recipesService.likeRecipe(id, user.sub);
  }
}
