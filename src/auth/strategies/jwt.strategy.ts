import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_TYPE } from '../../utils/constants/constants';
import { ReadCurrentUserDto } from '../dto/read-current-user-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_TYPE) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_TOKEN_SECRET'),
    });
  }

  async validate(user: ReadCurrentUserDto): Promise<ReadCurrentUserDto> {
    return user;
  }
}
