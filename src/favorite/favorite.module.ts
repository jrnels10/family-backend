import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UsersRepository } from 'src/users/users.repository';
import { RecipesRepository } from 'src/recipes/recipes.repository';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      RecipesRepository,
      UsersRepository,
      FavoriteRepository,
    ]),
  ],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    FavoriteRepository,
    RecipesRepository,
    UsersRepository,
  ],
})
export class FavoriteModule {}
