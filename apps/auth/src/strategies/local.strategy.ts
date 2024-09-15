import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  // Vơí local strategy này thì không cần phải login (truyền bằng body là được)
  async validate(email: string, password: string) {
    console.log('email', email, 'password', password);

    return this.usersService.validateUser(email, password);
  }
}
