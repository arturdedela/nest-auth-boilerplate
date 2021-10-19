import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'users/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  create(email: string, password: string) {
    return this.userRepository.save(new User(email, password));
  }
}
