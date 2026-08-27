// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpEngine extends GenericRepository {
  public static override readonly displayName: string = 'gp-engine';

  public static override readonly description: string =
    'The open-source C++23 graphics engine at the core of Graphical Playground, targeting Vulkan, DirectX 11/12, OpenGL/OpenGL ES, and Metal across desktop, mobile, and console platforms.';

  public static override readonly license: LicenseIdentifier = 'Apache-2.0';
}
