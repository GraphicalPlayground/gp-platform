import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq, and, count } from 'drizzle-orm';
import { z } from 'zod';
import { createCourseSchema, updateCourseSchema, courseLevelSchema } from '@gp/types';
import { db } from '../../db/connection.ts';
import { courses } from '../../db/schema/index.ts';
import { ok, paginated } from '../../lib/response.ts';
import { NotFoundError, ForbiddenError } from '../../lib/errors.ts';
import { authenticate, authorize } from '../../middleware/auth.ts';

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
  level: courseLevelSchema.optional()
});

const coursesRouter = new Hono();

coursesRouter.get('/', zValidator('query', listQuerySchema), async (c) => {
  const { page, perPage, level } = c.req.valid('query');
  const offset = (page - 1) * perPage;

  const where = and(eq(courses.status, 'published'), level ? eq(courses.level, level) : undefined);

  const countResult = await db.select({ total: count() }).from(courses).where(where);
  const total = countResult[0]?.total ?? 0;
  const rows = await db.select().from(courses).where(where).limit(perPage).offset(offset);

  return paginated(c, rows, { total, page, perPage });
});

coursesRouter.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const [course] = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  if (!course) throw new NotFoundError('Course');
  return ok(c, course);
});

coursesRouter.post(
  '/',
  authenticate,
  authorize('instructor', 'admin'),
  zValidator('json', createCourseSchema),
  async (c) => {
    const user = c.get('user');
    const body = c.req.valid('json');

    const [course] = await db
      .insert(courses)
      .values({
        ...body,
        instructorId: user.sub,
        thumbnailUrl: body.thumbnailUrl ?? null,
        estimatedHours: body.estimatedHours ?? null
      })
      .returning();

    if (!course) throw new Error('Failed to create course');
    return ok(c, course, 201);
  }
);

coursesRouter.patch(
  '/:id',
  authenticate,
  authorize('instructor', 'admin'),
  zValidator('json', updateCourseSchema),
  async (c) => {
    const id = c.req.param('id');
    const user = c.get('user');
    const body = c.req.valid('json');

    const [existing] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    if (!existing) throw new NotFoundError('Course');
    if (existing.instructorId !== user.sub && user.role !== 'admin') throw new ForbiddenError();

    const [updated] = await db
      .update(courses)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();

    return ok(c, updated);
  }
);

coursesRouter.delete('/:id', authenticate, authorize('admin'), async (c) => {
  const id = c.req.param('id');
  const [existing] = await db.select({ id: courses.id }).from(courses).where(eq(courses.id, id)).limit(1);
  if (!existing) throw new NotFoundError('Course');

  await db.delete(courses).where(eq(courses.id, id));
  return ok(c, { id });
});

export { coursesRouter };
