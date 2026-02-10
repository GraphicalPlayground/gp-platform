/** Dependencies */
// @ts-ignore
import plugin from 'tailwindcss/plugin.js';
import { GPTWPluginOptions } from './types';
import { variants } from './variants';
import { animations, keyframes } from './animations';

/**
 * @brief Represents the GP Tailwind CSS plugin.
 * @description This plugin adds custom variants and utilities to Tailwind CSS.
 */
export const GPTWPlugin = (options?: GPTWPluginOptions): ReturnType<typeof plugin> => {
  return plugin(
    ({ addVariant }: any) => {
      // Register custom variants
      Object.keys(variants).forEach((variant) => {
        addVariant(variant, variants[variant]);
      });
    },
    {
      theme: {
        extend: {
          keyframes: keyframes,
          animations: animations
        }
      }
    }
  );
};
