import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('user', user);

    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard) // Step 4: Thực thi chiến lược JWT Auth Guard (jwt.strategy.ts)
  @MessagePattern('validate_user') // Step 3: Service auth sẽ nhận request và validate user
  async validateUser(@CurrentUser() user: User) {
    console.log('user', user);

    return user;
  }
}
