import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  test(): string {
    return 'string';
  }

  //   async createNewRecipe(createRecipeDto: CreateRecipeDto) {
  //     const { title, duration, description } = createRecipeDto;
  //     const queryParams = [title, duration, description];
  //     const queryString = `INSERT INTO public.recipe(title, duration,description)
  //           VALUES($1,$2,$3)`;
  //     const res = await this.query(queryString, queryParams);
  //     console.log(res);
  //     return res;
  //   }
}
