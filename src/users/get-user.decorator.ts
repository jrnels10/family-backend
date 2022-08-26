import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';

export const GetUser = createParamDecorator(
  // (data, context: ExecutionContext) => {
  //   const request = context.switchToHttp().getRequest();
  //   if (!data) return request.user;
  //   console.log(request.user);
  //   return request.user[data];
  // },
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
