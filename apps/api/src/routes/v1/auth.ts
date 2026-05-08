import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq, or } from 'drizzle-orm';
import { registerSchema, loginSchema } from '@gp/types';
import { db } from '../../db/connection.ts';
import { users } from '../../db/schema/index.ts';
import { signToken } from '../../lib/jwt.ts';
import { ok } from '../../lib/response.ts';
import { ConflictError, UnauthorizedError } from '../../lib/errors.ts';
import { authenticate } from '../../middleware/auth.ts';

const auth = new Hono();

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, pseudo, password } = c.req.valid('json');

  const existingEmail = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existingEmail.length > 0) throw new ConflictError('Email is already registered');

  const existingPseudo = await db.select({ id: users.id }).from(users).where(eq(users.pseudo, pseudo)).limit(1);
  if (existingPseudo.length > 0) throw new ConflictError('Pseudo is already taken');

  const passwordHash = await Bun.password.hash(password);
  const [user] = await db
    .insert(users)
    .values({ email, pseudo, passwordHash })
    .returning({ id: users.id, email: users.email, pseudo: users.pseudo, role: users.role });

  if (!user) throw new Error('Failed to create user');

  const accessToken = await signToken({ sub: user.id, email: user.email, role: user.role });

  return ok(c, { user, accessToken }, 201);
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { identifier, password } = c.req.valid('json');

  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, identifier), eq(users.pseudo, identifier)))
    .limit(1);

  if (!user || !user.passwordHash) throw new UnauthorizedError('Invalid credentials');

  const isValid = await Bun.password.verify(password, user.passwordHash);
  if (!isValid) throw new UnauthorizedError('Invalid email or password');

  const accessToken = await signToken({ sub: user.id, email: user.email, role: user.role });

  return ok(c, {
    user: { id: user.id, email: user.email, pseudo: user.pseudo, role: user.role },
    accessToken
  });
});

auth.get('/me', authenticate, (c) => {
  const { sub, email, role } = c.get('user');
  return ok(c, { id: sub, email, role });
});

export { auth };
