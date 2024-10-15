import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/common/utils/hashpassword.util';
import Role from 'src/common/enums/Role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        where: { role: Not(Role.Admin) },
        select: ['id', 'firstName', 'lastName', 'email', 'role', 'password'],
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users.');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found.`);
      }
      return user;
    } catch (error) {
      console.error(`Error finding user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user details.');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with email "${email}" not found.`);
      }
      return user;
    } catch (error) {
      console.error(`Error finding user with email ${email}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user details.');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      newUser.password = await hashPassword(newUser.password);
      const savedUser = await this.usersRepository.save(newUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create a new user.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.findOne(id); // Validate if the user exists
      Object.assign(existingUser, updateUserDto);
      await this.usersRepository.save(existingUser);
      return existingUser;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.findOne(id); // Validate if the user exists
      await this.usersRepository.remove(user);
      return user;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
