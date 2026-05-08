import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { registerSchema, loginSchema } from '@gp/types';
import { db } from '../../db/connection.ts';
import { users } from '../../db/schema/index.ts';
import { signToken } from '../../lib/jwt.ts';
import { ok } from '../../lib/response.ts';
import { ConflictError, UnauthorizedError } from '../../lib/errors.ts';
import { authenticate } from '../../middleware/auth.ts';

const auth = new Hono();

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, name, password } = c.req.valid('json');

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) throw new ConflictError('Email is already registered');

  const passwordHash = await Bun.password.hash(password);
  const [user] = await db
    .insert(users)
    .values({ email, name, passwordHash })
    .returning({ id: users.id, email: users.email, name: users.name, role: users.role });

  if (!user) throw new Error('Failed to create user');

  const accessToken = await signToken({ sub: user.id, email: user.email, role: user.role });

  return ok(c, { user, accessToken }, 201);
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user) throw new UnauthorizedError('Invalid email or password');

  const isValid = await Bun.password.verify(password, user.passwordHash);
  if (!isValid) throw new UnauthorizedError('Invalid email or password');

  const accessToken = await signToken({ sub: user.id, email: user.email, role: user.role });

  return ok(c, {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken
  });
});

auth.get('/me', authenticate, (c) => {
  const { sub, email, role } = c.get('user');
  return ok(c, { id: sub, email, role });
});

export { auth };
