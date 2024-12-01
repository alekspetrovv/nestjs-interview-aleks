import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReadCurrentUserDto extends User {
  @ApiProperty()
  iat: string;
  @ApiProperty()
  exp: string;
}
