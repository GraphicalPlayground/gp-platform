import { createMiddleware } from 'hono/factory';
import { verifyToken, type TokenPayload } from '../lib/jwt.ts';
import { UnauthorizedError, ForbiddenError } from '../lib/errors.ts';

declare module 'hono' {
  interface ContextVariableMap {
    user: TokenPayload;
  }
}

export const authenticate = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const token = authHeader.slice(7);
  const payload = await verifyToken(token);
  c.set('user', payload);
  await next();
});

export function authorize(...roles: Array<'student' | 'instructor' | 'admin'>) {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');
    if (!user) throw new UnauthorizedError();
    if (!roles.includes(user.role)) throw new ForbiddenError();
    await next();
  });
}
