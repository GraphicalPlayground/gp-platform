import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.ts';
import { courses, lessons } from './courses.ts';

export const enrollmentStatusEnum = pgEnum('enrollment_status', ['active', 'completed', 'cancelled']);

export const lessonProgressStatusEnum = pgEnum('lesson_progress_status', ['not_started', 'in_progress', 'completed']);

export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id, { onDelete: 'cascade' }),
  status: enrollmentStatusEnum('status').notNull().default('active'),
  progress: integer('progress').notNull().default(0),
  enrolledAt: timestamp('enrolled_at', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true })
});

export const lessonProgress = pgTable('lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lessons.id, { onDelete: 'cascade' }),
  status: lessonProgressStatusEnum('status').notNull().default('not_started'),
  completedAt: timestamp('completed_at', { withTimezone: true })
});

export type DbEnrollment = typeof enrollments.$inferSelect;
export type DbLessonProgress = typeof lessonProgress.$inferSelect;
