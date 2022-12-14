import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from 'src/recipes/entities/favorite.entity';
import { Ingredient } from './ingredients.entity';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  created: string;

  @Column({ nullable: true })
  userid: number;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.recipe)
  favorites: Favorite[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: ['insert', 'update'],
  })
  ingredients: Ingredient[];
}
