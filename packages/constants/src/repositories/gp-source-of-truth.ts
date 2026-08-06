// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpSourceOfTruth extends GenericRepository {
  public static override readonly name: string = 'gp-source-of-truth';

  public static override readonly description: string =
    'Centralized source of truth for organization-wide community files, compliance templates, and automated configuration sync.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
