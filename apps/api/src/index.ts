import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { env } from './config/env.ts';
import { corsMiddleware } from './middleware/cors.ts';
import { errorHandler } from './middleware/error-handler.ts';
import { router } from './routes/index.ts';

const app = new Hono();

app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', corsMiddleware);

app.route('/', router);

app.onError(errorHandler);

app.notFound((c) => c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404));

export default {
  port: env.PORT,
  fetch: app.fetch
};
