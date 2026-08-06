// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpEngineXbox extends GenericRepository {
  public static readonly name: string = 'gp-engine-xbox';

  public static readonly description: string =
    'Xbox One and Xbox Series X|S platform abstraction layer for the gp-engine. Utilizes the Microsoft GDK to implement Direct3D 12 console backends, HLSL pipelines, and platform-specific optimizations for studying modern Xbox architecture under NDA.';

  public static readonly license: LicenseIdentifier = 'Proprietary';
  public static readonly isPrivate: boolean = true;
}
