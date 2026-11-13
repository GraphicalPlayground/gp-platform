// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * @brief Represents a UUID (v1-v5).
 */
export type Uuid = Brand<string, 'Uuid'>;

/**
 * @brief Checks whether the given value is a well-formed UUID.
 * @param value - The value to check.
 * @returns Whether the value is a valid Uuid.
 */
export const isUuid = (value: string): value is Uuid => UUID_PATTERN.test(value);
