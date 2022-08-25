import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth0Id: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user_id, { eager: true })
  recipes: Recipe[];
}
