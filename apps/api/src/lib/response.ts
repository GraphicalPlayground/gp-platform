import type { Context } from 'hono';

type SuccessBody<T> = { success: true; data: T };
type PaginatedBody<T> = {
  success: true;
  data: T[];
  meta: { total: number; page: number; perPage: number; totalPages: number };
};
type ErrorBody = {
  success: false;
  error: { code: string; message: string; details?: Record<string, string[]> };
};

export function ok<T>(c: Context, data: T, status: 200 | 201 = 200) {
  return c.json<SuccessBody<T>>({ success: true, data }, status);
}

export function paginated<T>(c: Context, data: T[], meta: { total: number; page: number; perPage: number }) {
  return c.json<PaginatedBody<T>>({
    success: true,
    data,
    meta: { ...meta, totalPages: Math.ceil(meta.total / meta.perPage) }
  });
}

export function err(
  c: Context,
  code: string,
  message: string,
  status: number = 400,
  details?: Record<string, string[]>
) {
  return c.json<ErrorBody>({ success: false, error: { code, message, details } }, status as never);
}
