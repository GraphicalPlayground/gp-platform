// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_ENV: z.enum(['production', 'preview', 'development']).default('development'),
    NEXT_PUBLIC_CDN_URL: z.url().min(1).optional(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_WAITLIST_URL: z.string().min(1),
    NEXT_PUBLIC_WAITLIST_MODE: z.enum(['true', 'false']).default('false')
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_ENV: process.env['NEXT_PUBLIC_APP_ENV'],
    NEXT_PUBLIC_CDN_URL: process.env['NEXT_PUBLIC_CDN_URL'],
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env['NEXT_PUBLIC_CLERK_SIGN_IN_URL'],
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env['NEXT_PUBLIC_CLERK_SIGN_UP_URL'],
    NEXT_PUBLIC_CLERK_WAITLIST_URL: process.env['NEXT_PUBLIC_CLERK_WAITLIST_URL'],
    NEXT_PUBLIC_WAITLIST_MODE: process.env['NEXT_PUBLIC_WAITLIST_MODE'],
    NODE_ENV: process.env['NODE_ENV']
  },
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development')
  }
});
