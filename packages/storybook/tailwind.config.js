/** Import theme */
import { GPTWPlugin } from '@gp/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.storybook/welcome.mdx',
    '../components/*/src/**/*.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/components/**/*.{js,jsx,ts,tsx}',
    '../core/theme/src/utils/**/*.{js,jsx,ts,tsx}',
    '../core/theme/stories/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  plugins: [GPTWPlugin()]
};
