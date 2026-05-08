import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'instructor', 'admin']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  pseudo: z.string().min(3).max(50),
  firstName: z.string().max(100).nullable().optional(),
  lastName: z.string().max(100).nullable().optional(),
  role: userRoleSchema,
  avatarUrl: z.string().url().nullable().optional(),
  mfaEnabled: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type User = z.infer<typeof userSchema>;
export type PublicUser = Pick<User, 'id' | 'pseudo' | 'role' | 'avatarUrl'>;
