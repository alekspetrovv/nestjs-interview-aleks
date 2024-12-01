import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { User } from '../users/entities/user.entity';
import { ReadLoginResponseDto } from './dto/read-login-response-dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign_in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() _authDto: AuthDto,
    @CurrentUser() user,
  ): Promise<ReadLoginResponseDto> {
    return user;
  }

  @Public()
  @Post('sign_up')
  signUp(@Body() authDto: AuthDto): Promise<User> {
    return this.authService.signUp(authDto);
  }
}
