// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clerkClient } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { parsePagination, requireAdmin, serverError } from '@/lib/admin-guard';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const url = new URL(req.url);
  const { limit, offset } = parsePagination(url);
  const query = url.searchParams.get('query')?.trim() ?? undefined;
  const orderBy = (url.searchParams.get('orderBy') as 'created_at' | 'updated_at') ?? 'created_at';

  try {
    const client = await clerkClient();

    const userList = await client.users.getUserList({
      limit,
      offset,
      query,
      orderBy: `-${orderBy}`
    });

    return NextResponse.json(
      {
        users: userList.data.map(sanitizeUser),
        totalCount: userList.totalCount,
        pagination: { limit, offset }
      },
      { status: 200 }
    );
  } catch (error) {
    return serverError('GET /api/admin/users', error);
  }
}

/**
 * Strip any fields we never need on the client (internal Clerk tokens, etc.)
 * and normalise the shape for our own API contract.
 */
function sanitizeUser(user: User) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || null,
    username: user.username,
    imageUrl: user.imageUrl,
    primaryEmail: user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? null,
    emailAddresses: user.emailAddresses.map((e) => e.emailAddress),
    role: (user.publicMetadata?.['role'] as string) ?? 'user',
    banned: user.banned,
    locked: user.locked,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastSignInAt: user.lastSignInAt,
    lastActiveAt: user.lastActiveAt,
    twoFactorEnabled: user.twoFactorEnabled
  };
}
