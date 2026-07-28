// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PlopTypes } from '@turbo/gen';
import { componentGenerator } from './component';

/**
 * @brief Registers the generators with the Plop API.
 * @example Run `turbo gen component` to generate a new UI component.
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('component', componentGenerator);
}
