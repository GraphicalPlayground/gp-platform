// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { DEFAULT_STRICT_MODE, STRICT_MODE_GLOBAL_TYPE_ID } from './constants';
import type { GlobalTypes } from 'storybook/internal/csf';

export { STRICT_MODE_GLOBAL_TYPE_ID };

export const strictModeGlobalType: GlobalTypes = {
  [STRICT_MODE_GLOBAL_TYPE_ID]: {
    name: 'Strict Mode',
    description: 'Enable React Strict Mode',
    defaultValue: DEFAULT_STRICT_MODE,
    toolbar: {
      icon: 'lock',
      items: [
        { value: 'false', title: 'Strict Mode Off', icon: 'unlock' },
        { value: 'true', title: 'Strict Mode On', icon: 'lock' }
      ]
    }
  }
};
