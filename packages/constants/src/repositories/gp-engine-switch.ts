// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpEngineSwitch extends GenericRepository {
  public static override readonly name: string = 'gp-engine-switch';

  public static override readonly description: string =
    'Nintendo Switch platform abstraction layer for the gp-engine. Provides hardware-specific RHI implementations, NVN/Vulkan bindings, and console-specific memory management for learning and evaluating hardware-level graphics development under NDA.';

  public static override readonly license: LicenseIdentifier = 'Proprietary';
  public static override readonly isPrivate: boolean = true;
}
