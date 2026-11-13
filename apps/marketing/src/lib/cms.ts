// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import path from 'node:path';
import { Cms } from '@gp/content';

/**
 * @brief Singleton instance of the CMS for the marketing app.
 */
export const cms = new Cms({
  contentRootDirectory: path.join(process.cwd(), '..', '..', 'content')
});
