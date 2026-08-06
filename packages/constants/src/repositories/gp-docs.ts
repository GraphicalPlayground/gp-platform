// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpDocs extends GenericRepository {
  public static override readonly name: string = 'gp-docs';

  public static override readonly description: string =
    'Technical documentation for the Graphical Playground ecosystem, including engine internals, platform architecture, APIs, and contributor guidelines.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
