// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import conventional from '@commitlint/config-conventional';

/**
 * Commitlint config
 */
const commitLintConfig = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://github.com/GraphicalPlayground/gp-platform/blob/main/CONTRIBUTING.md#commit-convention',
  rules: {
    ...conventional.rules,
    'header-max-length': [0],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'test', 'build', 'ci', 'chore', 'revert', 'feature']
    ]
  }
};

export default commitLintConfig;
