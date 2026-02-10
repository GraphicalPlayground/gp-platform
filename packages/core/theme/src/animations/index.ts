/** Dependencies */
import { slideUp } from './slide-up';

/**
 * @brief Represents the keyframes for all the animations of the application.
 * @description This object contains the keyframes for each animation.
 */
export const keyframes = {
  'slide-up': slideUp.keyframes
};

/**
 * @brief Represents the animations of the application.
 * @description This object contains the animations for each keyframe.
 */
export const animations = {
  'slide-up': slideUp.animation
};
