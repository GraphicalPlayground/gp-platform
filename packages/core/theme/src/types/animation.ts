/**
 * @brief Represents a Tailwind CSS animation.
 * @description This interface defines the structure of a Tailwind CSS animation, including its keyframes and animation properties.
 */
export interface TWAnimation {
  keyframes: {
    [key: string]: {
      [property in keyof CSSStyleDeclaration]?: string;
    };
  };
  animation: string;
}
