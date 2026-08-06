// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpActions extends GenericRepository {
  public static readonly name: string = 'gp-actions';

  public static readonly description: string =
    'A collection of reusable GitHub Actions designed for automation and continuous integration. Provides standardized workflows over modern development pipelines, enabling contributors to build, test, and maintain core graphics projects and ecosystem infrastructure.';

  public static readonly license: LicenseIdentifier = 'Apache-2.0';
}
