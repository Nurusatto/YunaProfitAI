import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Assuming your authentication guard or middleware sets 'request.user'
    if (data) { // If 'data' is provided, extract a specific property from the user object
      return request.user?.[data as string]; 
    }
    return request.user; // Otherwise, return the entire user object
  },
);