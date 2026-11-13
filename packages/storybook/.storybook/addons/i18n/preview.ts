// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES } from './constants';
import type { GlobalTypes } from 'storybook/internal/csf';

export { I18N_GLOBAL_TYPE_ID };

export const i18nGlobalType: GlobalTypes = {
  [I18N_GLOBAL_TYPE_ID]: {
    name: 'I18n',
    description: 'Internationalization locale',
    defaultValue: DEFAULT_LOCALE,
    toolbar: {
      icon: 'globe',
      items: LOCALES.map((locale) => ({
        value: locale.value,
        title: locale.label,
        right: locale.value === 'Auto' ? undefined : locale.value
      })).sort((a, b) => (a.value === 'Auto' ? -1 : b.value === 'Auto' ? 1 : a.title.localeCompare(b.title))),
      dynamicTitle: true
    }
  }
};
