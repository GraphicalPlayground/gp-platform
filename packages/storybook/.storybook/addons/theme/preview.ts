// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { DEFAULT_THEME, THEME_GLOBAL_TYPE_ID, THEME_OPTIONS, THEME_VALUES } from './constants';
import type { GlobalTypes } from 'storybook/internal/csf';

export { THEME_GLOBAL_TYPE_ID };

export const themeGlobalType: GlobalTypes = {
  [THEME_GLOBAL_TYPE_ID]: {
    name: 'Theme',
    description: 'GPlayd theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      items: THEME_OPTIONS.filter((option) => THEME_VALUES.includes(option.value as any)).map((option) => ({
        value: option.value,
        title: option.title
      })),
      dynamicTitle: true
    }
  }
};
