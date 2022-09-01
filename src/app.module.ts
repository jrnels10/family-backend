import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesService } from './recipes/recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { RecipesRepository } from './recipes/recipes.repository';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { User } from './users/entities/user.entity';
import { Recipe } from './recipes/entities/recipe.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { Favorite } from './favorite/entities/favorite.entity';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteRepository } from './favorite/favorite.repository';
import { FavoriteService } from './favorite/favorite.service';
import { ImagesModule } from './images/images.module';
import { ImagesService } from './images/images.service';

@Module({
  imports: [
    AuthorizationModule,
    UsersModule,
    RecipesModule,
    ConfigModule.forRoot({
      envFilePath: './config/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/**/*.entity.{js,ts}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Recipe, User, Favorite]),
    DatabaseModule,
    FavoriteModule,
    ImagesModule,
  ],
  controllers: [
    AppController,
    UsersController,
    FavoriteController,
    RecipesController,
  ],
  providers: [
    AppService,
    RecipesService,
    UsersService,
    FavoriteService,
    ImagesService,
    UsersRepository,
    RecipesRepository,
    FavoriteRepository,
  ],
})
export class AppModule {}
