import { z } from 'zod';

export const courseLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
export const courseStatusSchema = z.enum(['draft', 'published', 'archived']);
export const lessonTypeSchema = z.enum(['video', 'text', 'interactive', 'quiz']);

export type CourseLevel = z.infer<typeof courseLevelSchema>;
export type CourseStatus = z.infer<typeof courseStatusSchema>;
export type LessonType = z.infer<typeof lessonTypeSchema>;

export const courseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string(),
  shortDescription: z.string().max(300),
  level: courseLevelSchema,
  status: courseStatusSchema,
  instructorId: z.string().uuid(),
  thumbnailUrl: z.string().url().nullable(),
  estimatedHours: z.number().positive().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const moduleSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().nullable(),
  order: z.number().int().nonnegative(),
  createdAt: z.string().datetime()
});

export const lessonSchema = z.object({
  id: z.string().uuid(),
  moduleId: z.string().uuid(),
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  type: lessonTypeSchema,
  order: z.number().int().nonnegative(),
  estimatedMinutes: z.number().int().positive().nullable(),
  isFree: z.boolean(),
  createdAt: z.string().datetime()
});

export const createCourseSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  description: z.string().default(''),
  shortDescription: z.string().max(300).default(''),
  level: courseLevelSchema.default('beginner'),
  thumbnailUrl: z.string().url().optional(),
  estimatedHours: z.number().positive().optional()
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  status: courseStatusSchema.optional()
});

export type Course = z.infer<typeof courseSchema>;
export type CourseModule = z.infer<typeof moduleSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
