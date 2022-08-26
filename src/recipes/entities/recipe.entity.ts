import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.auth0Id)
  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  description: string;
}
