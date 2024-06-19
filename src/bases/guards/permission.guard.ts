import {
  PERMISSION_KEY,
  PermissionMetadata,
} from '@/bases/decorators/permission.decorator';
import { ErrorMessage } from '@/constants/message';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPayload } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.getAllAndOverride<PermissionMetadata>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!metadata) {
      return true;
    }

    const { user }: { user: UserPayload } = context.switchToHttp().getRequest();

    return true;

    throw new ForbiddenException(ErrorMessage.FORBIDDEN);
  }
}
