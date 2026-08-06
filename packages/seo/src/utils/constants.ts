// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization, Keywords } from '@gp/constants';

/**
 * @brief Backwards-compatible facade over `@gp/constants`'s `Organization`/`Keywords`, kept for the app-level
 * consumers (`apps/marketing`, `apps/app`, `apps/admin`) that import `Constants` from `@gp/seo/utils`. New code
 * within `@gp/seo` itself should import `Organization`/`Keywords` from `@gp/constants` directly instead.
 */
export const Constants = {
  name: Organization.name,
  description: Organization.description,
  product: Organization.product,
  alternateNames: Organization.alternateNames,
  keywords: Keywords
} as const;
