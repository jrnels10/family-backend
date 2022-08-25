import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recipes, { eager: false })
  @Column()
  user_id: string;

  @Column()
  title: string;
  @Column()
  duration: string;
  @Column()
  description: string;
}
