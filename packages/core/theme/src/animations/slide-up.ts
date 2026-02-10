/** Dependencies */
import { TWAnimation } from '../types';

/**
 * @brief Represents a slide-up animation.
 * @description This animation moves an element upwards while fading it in.
 */
export const slideUp: TWAnimation = {
  keyframes: {
    '0%': {
      transform: 'translate(var(--tw-translate-x), 100%)',
      opacity: '0'
    },
    '100%': {
      transform: 'translate(var(--tw-translate-x), 0)',
      opacity: '1'
    }
  },
  animation: 'slide-up 0.1s ease-out'
};
