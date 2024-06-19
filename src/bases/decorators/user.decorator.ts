import { type Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  return request.user;
});
