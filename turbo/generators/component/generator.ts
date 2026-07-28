// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { PlopTypes } from '@turbo/gen';
import path from 'node:path';

/**
 * @brief The generator configuration for creating a new UI component.
 * @details This generator will create a new component in the `packages/ui` directory with the following files:
 * - `{{kebabCase name}}.tsx`: The main component file.
 * - `index.ts`: The index file for the component.
 * - `{{kebabCase name}}.module.css`: The CSS module for the component.
 * - `{{kebabCase name}}.module.css.d.ts`: The TypeScript declaration file for the CSS module.
 * - `{{kebabCase name}}.stories.tsx`: The Storybook stories for the component.
 */
export const componentGenerator: PlopTypes.PlopGeneratorConfig = {
  description: 'Adds a new UI component to packages/ui',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the component name? (e.g. radio-button)'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'packages/ui/src/components/{{kebabCase name}}/{{kebabCase name}}.tsx',
      templateFile: path.resolve(__dirname, 'component/templates/component.tsx.hbs')
    },
    {
      type: 'add',
      path: 'packages/ui/src/components/{{kebabCase name}}/index.ts',
      templateFile: path.resolve(__dirname, 'component/templates/index.ts.hbs')
    },
    {
      type: 'add',
      path: 'packages/ui/src/components/{{kebabCase name}}/{{kebabCase name}}.module.css',
      templateFile: path.resolve(__dirname, 'component/templates/module.css.hbs')
    },
    {
      type: 'add',
      path: 'packages/ui/src/components/{{kebabCase name}}/{{kebabCase name}}.module.css.d.ts',
      templateFile: path.resolve(__dirname, 'component/templates/module.css.d.ts.hbs')
    },
    {
      type: 'add',
      path: 'packages/ui/src/components/{{kebabCase name}}/{{kebabCase name}}.stories.tsx',
      templateFile: path.resolve(__dirname, 'component/templates/stories.tsx.hbs')
    },
    {
      type: "append",
      path: "packages/ui/src/components/index.ts",
      pattern: /\/\* Export the components \*\//,
      template: "export * from './{{kebabCase name}}';",
    }
  ]
};
