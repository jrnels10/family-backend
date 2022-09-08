import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Favorite } from 'src/recipes/entities/favorite.entity';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth0Id: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
