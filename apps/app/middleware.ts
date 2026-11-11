// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { NextResponse } from 'next/server';
import { SeoRobots } from '@gp/seo/robots';

/**
 * @brief Middleware function to set SEO-related headers for all requests.
 * @returns A NextResponse object with the appropriate headers set.
 */
export function middleware() {
  const res = NextResponse.next();
  Object.entries(SeoRobots.noIndexHeaders()).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export const config = {
  matcher: '/:path*'
};
