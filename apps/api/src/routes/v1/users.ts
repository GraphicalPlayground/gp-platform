import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq, count } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../db/connection.ts';
import { users } from '../../db/schema/index.ts';
import { ok, paginated } from '../../lib/response.ts';
import { NotFoundError } from '../../lib/errors.ts';
import { authenticate, authorize } from '../../middleware/auth.ts';

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20)
});

const usersRouter = new Hono();

usersRouter.get('/', authenticate, authorize('admin'), zValidator('query', listQuerySchema), async (c) => {
  const { page, perPage } = c.req.valid('query');
  const offset = (page - 1) * perPage;

  const countResult = await db.select({ total: count() }).from(users);
  const total = countResult[0]?.total ?? 0;
  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt
    })
    .from(users)
    .limit(perPage)
    .offset(offset);

  return paginated(c, rows, { total, page, perPage });
});

usersRouter.get('/:id', authenticate, authorize('admin'), async (c) => {
  const id = c.req.param('id');
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user) throw new NotFoundError('User');
  return ok(c, user);
});

export { usersRouter };
