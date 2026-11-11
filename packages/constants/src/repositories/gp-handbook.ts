// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpHandbook extends GenericRepository {
  public static override readonly displayName: string = 'gp-handbook';

  public static override readonly description: string =
    'A practical reference for graphics engineering concepts taught within Graphical Playground. Focuses on theory-to-implementation explanations, design patterns, and best practices.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
