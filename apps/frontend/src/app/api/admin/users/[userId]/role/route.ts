// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { badRequest, notFound, requireAdmin, serverError, VALID_ROLES, type UserRole } from '@/lib/admin-guard';

type RouteContext = { params: Promise<{ userId: string }> };

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  if (auth.userId === userId) {
    return badRequest('You cannot change your own role.', 'SELF_ROLE_CHANGE_FORBIDDEN');
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return badRequest('Request body must be valid JSON.');
  }

  const { role } = body;

  if (!role || typeof role !== 'string') {
    return badRequest('Field `role` is required and must be a string.');
  }

  if (!(VALID_ROLES as readonly string[]).includes(role)) {
    return badRequest(`Invalid role. Must be one of: ${VALID_ROLES.join(', ')}.`, 'INVALID_ROLE');
  }

  try {
    const client = await clerkClient();

    const existing = await client.users.getUser(userId);
    const currentMetadata = (existing.publicMetadata ?? {}) as Record<string, unknown>;

    const updated = await client.users.updateUser(userId, {
      publicMetadata: {
        ...currentMetadata,
        role: role as UserRole
      }
    });

    return NextResponse.json(
      {
        userId: updated.id,
        role: updated.publicMetadata?.['role']
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`PATCH /api/admin/users/${userId}/role`, error);
  }
}

function isClerkNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404
  );
}
