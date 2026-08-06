// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpPlatform extends GenericRepository {
  public static override readonly name: string = 'gp-platform';

  public static override readonly description: string =
    'The Next.js monorepo powering the Graphical Playground platform: marketing site, app, admin, and backend.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
