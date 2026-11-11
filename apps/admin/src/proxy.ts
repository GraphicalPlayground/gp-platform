// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * @brief Middleware for handling authentication and authorization using Clerk.
 * @details Now the middleware is resource based, forcing us to move the verification of the user to the layouts.
 */
export default clerkMiddleware();

/**
 * @brief Configuration for the Clerk middleware.
 */
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
