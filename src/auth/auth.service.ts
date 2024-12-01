import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ReadLoginResponseDto } from './dto/read-login-response-dto';
import { plainToClass } from 'class-transformer';
import { SALT_PASS, USERNAME_EXISTS } from '../utils/constants/constants';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ReadLoginResponseDto | null> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && compareSync(password, user.encryptedPassword)) {
      return plainToClass(ReadLoginResponseDto, {
        ...user,
        accessToken: this.jwtService.sign({ ...user }),
      });
    }

    return null;
  }

  async signUp({ username, password }: AuthDto): Promise<User> {
    // check if user exist wih username
    const user: User = await this.usersService.findOneByUsername(username);

    if (user) {
      throw new BadRequestException(USERNAME_EXISTS);
    }

    const encryptedPassword = hashSync(password, SALT_PASS);

    return this.usersService.create({ username, encryptedPassword });
  }
}
