import { SetMetadata } from '@nestjs/common';
import { isPublicDecorator } from '../../utils/constants/constants';

export const Public = () => SetMetadata(isPublicDecorator, true);
