import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  create(user: User) {
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUser: Partial<User>) {
    await this.usersRepository.update(id, updateUser);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.usersRepository.remove(user);
      return user;
    }
    return null;
  }
}
