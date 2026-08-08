// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { DEFAULT_REACT_SCAN, REACT_SCAN_GLOBAL_TYPE_ID } from './constants';
import type { GlobalTypes } from 'storybook/internal/csf';

export { REACT_SCAN_GLOBAL_TYPE_ID };

export const reactScanGlobalType: GlobalTypes = {
  [REACT_SCAN_GLOBAL_TYPE_ID]: {
    name: 'React Scan',
    description: 'Enable React Scan to detect performance issues (Only works in isolation mode)',
    defaultValue: DEFAULT_REACT_SCAN,
    toolbar: {
      icon: 'eye',
      items: [
        { value: 'false', title: 'React Scan Off', icon: 'eyeclose' },
        { value: 'true', title: 'React Scan On', icon: 'eye' }
      ]
    }
  }
};
