import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Types } from 'mongoose';
import { TokenPayload } from '../auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      console.log('userId', userId);
      const resUser = await this.usersService.getUser({
        _id: new Types.ObjectId(userId),
      });

      console.log('resUser', resUser);
      // Step 5: Xác thực và trả user về 
      return resUser;
    } catch (err) {
      console.log('error', err);
      throw new UnauthorizedException();
    }
  }
}
