// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpSampleProjects extends GenericRepository {
  public static override readonly name: string = 'gp-sample-projects';

  public static override readonly description: string =
    'A collection of guided sample projects demonstrating core graphics engineering concepts, rendering techniques, and system-level implementations used throughout the learning platform.';

  public static override readonly license: LicenseIdentifier = 'MIT';
}
