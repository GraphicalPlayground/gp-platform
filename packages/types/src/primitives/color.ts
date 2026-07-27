// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * @brief Represents a hexadecimal color (e.g. "#FFF", "#0A84FF", "#0A84FFCC").
 */
export type HexColor = Brand<string, 'HexColor'>;

/**
 * @brief Checks whether the given value is a well-formed hexadecimal color.
 * @param value - The value to check.
 * @returns Whether the value is a valid HexColor.
 */
export const isHexColor = (value: string): value is HexColor => HEX_COLOR_PATTERN.test(value);
