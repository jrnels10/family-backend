import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Favorite, (favorite) => favorite.recipes)
  favorites: Favorite[];
}
