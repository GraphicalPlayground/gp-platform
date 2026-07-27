// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @brief Represents a syntactically valid email address.
 */
export type Email = Brand<string, 'Email'>;

/**
 * @brief Checks whether the given value is a syntactically valid email address.
 * @param value - The value to check.
 * @returns Whether the value is a valid Email.
 */
export const isEmail = (value: string): value is Email => EMAIL_PATTERN.test(value);
