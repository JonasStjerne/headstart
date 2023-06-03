import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthHub = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const hub = request.hub;

    return data ? hub?.[data] : hub;
  },
);
