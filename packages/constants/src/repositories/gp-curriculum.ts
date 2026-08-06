// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpCurriculum extends GenericRepository {
  public static override readonly name: string = 'gp-curriculum';

  public static override readonly description: string =
    'Structured learning paths covering graphics engineering from foundational algorithms to advanced GPU systems. Defines progression, learning objectives, and module dependencies across the platform.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
