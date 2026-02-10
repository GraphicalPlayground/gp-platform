/** Dependencies */
import type { ClassValue } from 'tailwind-variants';

/**
 * @brief Maps slot names to their corresponding Tailwind CSS classes.
 * @description This utility type takes a string literal type `S` representing slot names and maps each slot name to its corresponding Tailwind CSS class.
 * @example
 * ```
 * type MySlots = 'header' | 'footer';
 * type MyClasses = SlotsToClasses<MySlots>;
 * ```
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>;
};
