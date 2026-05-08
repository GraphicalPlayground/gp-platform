import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../config/env.ts';
import * as schema from './schema/index.ts';

const client = postgres(env.DATABASE_URL, {
  max: env.NODE_ENV === 'production' ? 10 : 3,
  idle_timeout: 20,
  connect_timeout: 10,
  onnotice: () => {}
});

export const db = drizzle(client, { schema, logger: env.NODE_ENV === 'development' });

export type Database = typeof db;
