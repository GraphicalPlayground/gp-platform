import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'instructor', 'admin']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: userRoleSchema,
  avatarUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type User = z.infer<typeof userSchema>;
export type PublicUser = Pick<User, 'id' | 'name' | 'role' | 'avatarUrl'>;
