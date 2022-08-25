import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
// import { AuthenticationClient } from 'auth0';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(token: string) {
    return this.userRepository.findOneBy({ id: 3 });
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
