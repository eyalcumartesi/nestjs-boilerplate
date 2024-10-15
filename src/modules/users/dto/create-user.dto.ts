import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import Role from 'src/common/enums/Role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: Role;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
