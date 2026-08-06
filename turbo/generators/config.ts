// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PlopTypes } from '@turbo/gen';
import { componentGenerator } from './component';
import { ARTICLE_TYPE_TO_FOLDER, articleGenerator } from './article';
import { legalGenerator } from './legal';

/**
 * @brief Registers the generators with the Plop API.
 * @example Run `turbo gen component` to generate a new UI component.
 * @example Run `turbo gen article` to scaffold a new content/articles MDX file.
 * @example Run `turbo gen legal` to scaffold a new content/legal MDX file.
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('articleFolder', (type: string) => ARTICLE_TYPE_TO_FOLDER[type] ?? type);
  plop.setHelper('today', () => new Date().toISOString().slice(0, 10));

  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('article', articleGenerator);
  plop.setGenerator('legal', legalGenerator);
}
