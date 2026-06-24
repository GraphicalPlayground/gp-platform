// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { badRequest, notFound, requireAdmin, serverError } from '@/lib/admin-guard';

type RouteContext = { params: Promise<{ userId: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`GET /api/admin/users/${userId}`, error);
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return badRequest('Request body must be valid JSON.');
  }

  // Only allow an explicit allowlist of fields to be updated
  const { firstName, lastName, username, publicMetadata } = body;
  const updatePayload: Record<string, unknown> = {};

  if (firstName !== undefined) {
    if (typeof firstName !== 'string') return badRequest('firstName must be a string.');
    updatePayload['firstName'] = firstName.trim();
  }
  if (lastName !== undefined) {
    if (typeof lastName !== 'string') return badRequest('lastName must be a string.');
    updatePayload['lastName'] = lastName.trim();
  }
  if (username !== undefined) {
    if (typeof username !== 'string') return badRequest('username must be a string.');
    updatePayload['username'] = username.trim();
  }
  if (publicMetadata !== undefined) {
    if (typeof publicMetadata !== 'object' || Array.isArray(publicMetadata)) {
      return badRequest('publicMetadata must be a plain object.');
    }
    updatePayload['publicMetadata'] = publicMetadata;
  }

  if (Object.keys(updatePayload).length === 0) {
    return badRequest('No valid fields provided for update.');
  }

  try {
    const client = await clerkClient();
    const updated = await client.users.updateUser(userId, updatePayload);

    return NextResponse.json({ user: updated }, { status: 200 });
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`PATCH /api/admin/users/${userId}`, error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  // Prevent self-deletion
  if (auth.userId === userId) {
    return badRequest('You cannot delete your own account.', 'SELF_DELETE_FORBIDDEN');
  }

  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);

    return NextResponse.json({ deleted: true, userId }, { status: 200 });
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`DELETE /api/admin/users/${userId}`, error);
  }
}

function isClerkNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404
  );
}
