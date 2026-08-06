// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpExperiments extends GenericRepository {
  public static readonly name: string = 'gp-experiments';

  public static readonly description: string =
    'Experimental graphics systems, prototypes, and research-oriented implementations. Used to explore new rendering techniques, abstractions, and performance optimizations.';

  public static readonly license: LicenseIdentifier = 'MIT';
}
