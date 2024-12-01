import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { isPublicDecorator, JWT_TYPE } from '../../utils/constants/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_TYPE) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      isPublicDecorator,
      [context.getHandler(), context.getClass()],
    );

    // allow some endpoints without authentication (if public decorator is configured)
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
