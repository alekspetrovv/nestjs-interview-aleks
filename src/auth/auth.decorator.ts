import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReadCurrentUserDto } from './dto/read-current-user-dto';
import { plainToInstance } from 'class-transformer';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ReadCurrentUserDto => {
    const currentUserData = context.switchToHttp().getRequest().user;

    return plainToInstance(ReadCurrentUserDto, {
      ...currentUserData,
    });
  },
);
