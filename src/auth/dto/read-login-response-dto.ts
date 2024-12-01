import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class ReadLoginResponseDto extends User {
  @ApiProperty()
  accessToken: string;
}
