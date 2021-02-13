import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async find(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findById(id: number | string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  async createUser(user: User): Promise<any> {
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('email needs to be provided');
    }
    return await this.usersRepository.findOne({ email });
  }
}
