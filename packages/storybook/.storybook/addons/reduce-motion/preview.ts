// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { DEFAULT_REDUCE_MOTION, REDUCE_MOTION_GLOBAL_TYPE_ID, REDUCE_MOTION_OPTIONS } from './constants';
import type { GlobalTypes } from 'storybook/internal/csf';

export { REDUCE_MOTION_GLOBAL_TYPE_ID };

export const reduceMotionGlobalType: GlobalTypes = {
  [REDUCE_MOTION_GLOBAL_TYPE_ID]: {
    name: 'Reduce Motion',
    description: 'Reduce motion for components',
    defaultValue: DEFAULT_REDUCE_MOTION,
    toolbar: {
      icon: 'play',
      items: REDUCE_MOTION_OPTIONS.map((option) => ({
        value: option.value,
        title: option.title
      })),
      dynamicTitle: true
    }
  }
};
