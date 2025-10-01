import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      // In a real app, you'd throw an UnauthorizedException
      return { statusCode: 401, message: 'Unauthorized' };
    }
    return this.authService.login(user);
  }
}
