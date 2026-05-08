import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
});

export const registerSchema = z.object({
  email: z.string().email(),
  pseudo: z.string().min(3).max(50),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export type AuthTokens = {
  accessToken: string;
  expiresIn: number;
};
