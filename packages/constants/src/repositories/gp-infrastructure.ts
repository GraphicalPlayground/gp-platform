// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpInfrastructure extends GenericRepository {
  public static readonly name: string = 'gp-infrastructure';

  public static readonly description: string =
    'Infrastructure and DevOps configuration for Graphical Playground. Manages cloud resources, remote GPU execution, scalability, security, and deployment of rendering workloads.';

  public static readonly license: LicenseIdentifier = 'MIT';
}
