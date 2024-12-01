import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/auth.decorator';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ReadCurrentUserDto } from '../auth/dto/read-current-user-dto';
import { User } from '../users/entities/user.entity';

@ApiTags('Current User')
@ApiBearerAuth()
@Controller('current_user')
export class CurrentUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  show(@CurrentUser() user: ReadCurrentUserDto): ReadCurrentUserDto {
    return user;
  }

  @Patch()
  async update(
    @CurrentUser() user: ReadCurrentUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(user, updateUserDto);
  }
}
