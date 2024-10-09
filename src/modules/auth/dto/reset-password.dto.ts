import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;
  @IsString()
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters long.',
  })
  @MaxLength(20, {
    message: 'Password is too long. It should be at most 20 characters long.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password must contain at least one letter, one number, and can include special characters',
  })
  newPassword: string;

  @IsString()
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters long.',
  })
  @MaxLength(20, {
    message: 'Password is too long. It should be at most 20 characters long.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password must contain at least one letter, one number, and can include special characters',
  })
  confirmPassword: string;
}
