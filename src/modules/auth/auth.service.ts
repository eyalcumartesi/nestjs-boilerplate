import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import {
  comparePassword,
  hashPassword,
} from 'src/common/utils/hashpassword.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await comparePassword(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<User | undefined> {
    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const { email } = this.jwtService.verify(token);
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email');

    user.password = await hashPassword(newPassword);
    await this.usersService.update(user.id, user);
    return user;
  }
}
