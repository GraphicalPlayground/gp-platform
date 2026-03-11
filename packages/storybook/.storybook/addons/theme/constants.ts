export const THEME_ADDON_ID = 'gp-theme-addon';
export const THEME_GLOBAL_TYPE_ID = 'gp-theme';
export const THEME_PARAM_KEY = 'gp-theme';
export const THEME_EVENT_NAME = 'gp-theme-changed';

export const THEME_VALUES = ['light', 'dark', 'graphical'] as const;
export type ThemeKey = (typeof THEME_VALUES)[number];

export const DEFAULT_THEME: ThemeKey = THEME_VALUES[1];

export interface ThemeOption {
  value: string;
  title: string;
  description?: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: THEME_VALUES[0],
    title: 'Light',
    description: 'Light theme'
  },
  {
    value: THEME_VALUES[1],
    title: 'Dark',
    description: 'Dark theme'
  },
  {
    value: THEME_VALUES[2],
    title: 'Graphical',
    description: 'Graphical dark theme'
  }
];

export const isThemeKey = (value: string | undefined | null): value is ThemeKey =>
  !!value && THEME_VALUES.includes(value as ThemeKey);

export const ensureThemeKey = (value: string | undefined | null): ThemeKey =>
  isThemeKey(value) ? value : DEFAULT_THEME;
