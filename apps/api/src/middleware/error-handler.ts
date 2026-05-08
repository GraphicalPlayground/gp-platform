import type { ErrorHandler } from 'hono';
import { ZodError } from 'zod';
import { AppError } from '../lib/errors.ts';

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof AppError) {
    return c.json({ success: false, error: { code: err.code, message: err.message } }, err.statusCode as never);
  }

  if (err instanceof ZodError) {
    const details = Object.fromEntries(Object.entries(err.flatten().fieldErrors).map(([k, v]) => [k, v ?? []]));
    return c.json(
      {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details }
      },
      422
    );
  }

  console.error('[Unhandled Error]', err);
  return c.json(
    {
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' }
    },
    500
  );
};
