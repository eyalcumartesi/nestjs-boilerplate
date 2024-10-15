import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EmailService } from 'src/common/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @Post('send-reset-password')
  async sendPasswordReset(
    @Body('email') email: string,
    @Body('resetLink') resetLink: string,
  ) {
    await this.emailService.sendPasswordResetEmail(email, resetLink);
    return { message: 'Password reset email sent successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword, confirmPassword } = resetPasswordDto;
    return this.authService.resetPassword(token, newPassword, confirmPassword);
  }
}
