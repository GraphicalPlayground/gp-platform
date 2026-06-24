// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { badRequest, notFound, requireAdmin, serverError } from '@/lib/admin-guard';

type RouteContext = { params: Promise<{ userId: string }> };

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  if (auth.userId === userId) {
    return badRequest('You cannot ban your own account.', 'SELF_BAN_FORBIDDEN');
  }

  try {
    const client = await clerkClient();
    const user = await client.users.banUser(userId);

    return NextResponse.json({ banned: true, userId: user.id }, { status: 200 });
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`POST /api/admin/users/${userId}/ban`, error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { userId } = await params;

  try {
    const client = await clerkClient();
    const user = await client.users.unbanUser(userId);

    return NextResponse.json({ banned: false, userId: user.id }, { status: 200 });
  } catch (error: unknown) {
    if (isClerkNotFound(error)) return notFound('User');
    return serverError(`DELETE /api/admin/users/${userId}/ban`, error);
  }
}

function isClerkNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 404
  );
}
