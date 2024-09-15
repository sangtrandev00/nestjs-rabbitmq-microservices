import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '@app/common';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Post('all')
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
