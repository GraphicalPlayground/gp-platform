// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { withMarkdown } from '@markdown-for-agents/nextjs';

/**
 * @brief Middleware for handling authentication and authorization using Clerk.
 * @details Now the middleware is resource based, forcing us to move the verification of the user to the layouts.
 */
const auth = clerkMiddleware();

/**
 * @brief Header used to mark the internal HTML fetch issued by `withMarkdown` so it can
 * skip straight to the page render.
 * @details Clerk's middleware throws when it processes that internal, self-issued
 * request, so it must bypass the `auth` branch entirely rather than just the accept
 * check below.
 */
const INTERNAL_FETCH_HEADER = 'x-markdown-internal-fetch';

/**
 * @brief Strips React's pending-Suspense fallback markup from a fully rendered page.
 * @details Route segments with a `loading.tsx` render inside a Suspense boundary. React's
 * streaming SSR writes the fallback inline (`<!--$?-->...<!--/$-->`) and later streams the
 * resolved content into a `hidden` sibling that a `$RC(...)` script swaps in on hydration.
 * By the time this internal fetch's body is fully read, both are present in the same
 * response; a generic HTML-to-Markdown pass has no notion of the swap and concatenates
 * both, so the fallback text has to be removed and the resolved content un-hidden here.
 */
function stripPendingSuspenseFallbacks(html: string): string {
  return html
    .replace(/<!--\$\?-->[\s\S]*?<!--\/\$-->/g, '')
    .replace(/(<[a-z]+\s[^>]*\bid="S:\d+"[^>]*)\shidden(?=[\s>])/gi, '$1');
}

/**
 * @brief Serves clients that send `Accept: text/markdown` a token-efficient Markdown
 * rendition of the page instead of HTML.
 * @details Middleware runs before the page is rendered, so the HTML has to be fetched
 * with a second, internal request, tagged with `INTERNAL_FETCH_HEADER` so it renders
 * the page directly instead of recursing back into this function.
 */
export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  if (request.headers.get(INTERNAL_FETCH_HEADER) === '1') {
    return NextResponse.next();
  }

  const accept = request.headers.get('accept') ?? '';
  const { pathname } = request.nextUrl;

  if (!accept.includes('text/markdown') || pathname.startsWith('/api') || pathname.startsWith('/trpc')) {
    return auth(request, event);
  }

  const handler = withMarkdown(
    async (req: NextRequest) => {
      const response = await fetch(req.url, {
        headers: { accept: 'text/html', [INTERNAL_FETCH_HEADER]: '1' },
        cache: 'no-store'
      });

      if (!(response.headers.get('content-type') ?? '').includes('text/html')) {
        return response;
      }

      const html = await response.text();
      const headers = new Headers(response.headers);

      headers.delete('content-length');

      return new Response(stripPendingSuspenseFallbacks(html), { status: response.status, headers });
    },
    {
      baseUrl: request.nextUrl.origin,
      extract: true,
      deduplicate: true,
      contentSignal: { aiTrain: true, search: true, aiInput: true }
    }
  );

  return (await handler(request, event)) ?? auth(request, event);
}

/**
 * @brief Configuration for the proxy, shared by the Clerk and Markdown middlewares.
 */
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
