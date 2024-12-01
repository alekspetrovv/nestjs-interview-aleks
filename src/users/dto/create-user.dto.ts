import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({ example: 'encryptedPassword' })
  encryptedPassword: string;
}
