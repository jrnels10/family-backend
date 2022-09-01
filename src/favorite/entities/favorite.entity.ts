import { Recipe } from 'src/recipes/entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import {
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  recipeId: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.favorites)
  @JoinTable()
  recipe: Recipe;
}
