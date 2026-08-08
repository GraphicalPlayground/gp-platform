// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import baseReactConfig from '@gp/standard/eslint/react.mjs';
import { defineConfig } from 'eslint/config';

const config = defineConfig([
  ...baseReactConfig,
  {
    ignores: ['storybook-static/**', 'storybook-static']
  }
]);

export default config;
