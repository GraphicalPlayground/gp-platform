// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export type AdminAuthResult = { ok: true; userId: string } | { ok: false; response: NextResponse };

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface ApiError {
  error: string;
  code?: string;
}

export const PAGINATION_DEFAULTS = {
  limit: 20,
  maxLimit: 100,
  offset: 0
} as const;

export const VALID_ROLES = ['admin', 'moderator', 'user'] as const;
export type UserRole = (typeof VALID_ROLES)[number];

/**
 * Verifies the request is authenticated and the caller holds the `admin` role.
 * Returns the caller's userId on success, or a 401/403 NextResponse on failure.
 */
export async function requireAdmin(): Promise<AdminAuthResult> {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json<ApiError>(
        { error: 'Unauthorized: Authentication required.', code: 'UNAUTHENTICATED' },
        { status: 401 }
      )
    };
  }

  if (sessionClaims?.metadata?.role !== 'admin') {
    return {
      ok: false,
      response: NextResponse.json<ApiError>(
        { error: 'Forbidden: Admin access required.', code: 'FORBIDDEN' },
        { status: 403 }
      )
    };
  }

  return { ok: true, userId };
}

export function parsePagination(url: URL): PaginationParams {
  const rawLimit = parseInt(url.searchParams.get('limit') ?? '', 10);
  const rawOffset = parseInt(url.searchParams.get('offset') ?? '', 10);

  const limit = Math.min(
    isNaN(rawLimit) || rawLimit < 1 ? PAGINATION_DEFAULTS.limit : rawLimit,
    PAGINATION_DEFAULTS.maxLimit
  );

  const offset = isNaN(rawOffset) || rawOffset < 0 ? PAGINATION_DEFAULTS.offset : rawOffset;

  return { limit, offset };
}

export function serverError(context: string, error: unknown): NextResponse {
  console.error(`[Admin API] ${context}:`, error);
  return NextResponse.json<ApiError>(
    { error: 'An internal server error occurred.', code: 'INTERNAL_ERROR' },
    { status: 500 }
  );
}

export function badRequest(message: string, code = 'BAD_REQUEST'): NextResponse {
  return NextResponse.json<ApiError>({ error: message, code }, { status: 400 });
}

export function notFound(resource: string): NextResponse {
  return NextResponse.json<ApiError>({ error: `${resource} not found.`, code: 'NOT_FOUND' }, { status: 404 });
}
