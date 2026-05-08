import { pgEnum, pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['student', 'instructor', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  pseudo: text('pseudo').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  passwordHash: text('password_hash'), // Nullable for OAuth-only users
  role: userRoleEnum('role').notNull().default('student'),
  avatarUrl: text('avatar_url'),
  
  // Auth/Security fields
  googleId: text('google_id').unique(),
  githubId: text('github_id').unique(),
  mfaEnabled: boolean('mfa_enabled').notNull().default(false),
  mfaSecret: text('mfa_secret'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export type DbUser = typeof users.$inferSelect;
export type NewDbUser = typeof users.$inferInsert;
