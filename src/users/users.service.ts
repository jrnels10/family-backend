import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  // constructor(private readonly userRepository: UsersRepository) {}
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto, id: string) {
    const found = await this.userRepository.findOneBy({ auth0Id: id });
    if (found) {
      return found;
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(auth0Id: string) {
    console.log('service', auth0Id);
    return this.userRepository.findOneBy({ auth0Id });
    // const res = await this.authClient.getProfile(token);
    // console.log('service');
    // if (res) {
    //   const foundUser = await this.userRepository.findOneBy({
    //     auth0Id: res.sub,
    //   });
    //   if (foundUser) {
    //     return foundUser;
    //   } else {
    //     console.log('create new user');
    //     return this.create({ ...res, auth0Id: res.sub });
    //   }
    // }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
