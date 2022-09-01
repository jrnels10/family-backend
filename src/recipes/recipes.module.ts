import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesRepository } from './recipes.repository';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { ImagesService } from 'src/images/images.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([RecipesRepository, UsersRepository]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, ImagesService, RecipesRepository],
})
export class RecipesModule {}
