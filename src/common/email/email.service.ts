import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // Method to send a simple email
  async sendMail(to: string, subject: string, template: string, context: any) {
    await this.mailerService.sendMail({
      to,
      subject,
      template, // The name of the template file without the extension
      context, // Data to be used in the template
    });
  }

  // Example method for sending a welcome email
  async sendWelcomeEmail(to: string, username: string) {
    const subject = 'Welcome to Our Platform!';
    const template = 'welcome'; // This should map to the welcome.hbs file
    const context = { username }; // The context data to inject into the template

    await this.sendMail(to, subject, template, context);
  }

  // Example method for sending a password reset email
  async sendPasswordResetEmail(to: string, resetLink: string) {
    const subject = 'Password Reset Request';
    const template = 'reset-password'; // This should map to reset-password.hbs
    const context = { resetLink };

    await this.sendMail(to, subject, template, context);
  }
}
