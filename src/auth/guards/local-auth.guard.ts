import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_TYPE } from '../../utils/constants/constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_TYPE) {}
