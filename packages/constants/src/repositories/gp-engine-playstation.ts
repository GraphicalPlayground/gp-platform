// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LicenseIdentifier } from '@gp/types';
import { GenericRepository } from '../base/repository';

export class GpEnginePlaystation extends GenericRepository {
  public static readonly name: string = 'gp-engine-playstation';

  public static readonly description: string =
    'PlayStation 4 and PlayStation 5 platform abstraction layer for the gp-engine. Implements AGC/GNM rendering backends, PSSL shader pipelines, and Sony SDK integrations for studying console architecture and low-level optimization under NDA.';

  public static readonly license: LicenseIdentifier = 'Proprietary';
  public static readonly isPrivate: boolean = true;
}
