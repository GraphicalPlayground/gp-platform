// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/* RFC 6838 "type/subtype" token grammar, ignoring optional parameters */
const MIME_TYPE_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.+]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.+]*$/;

/**
 * @brief Represents a MIME type (e.g. "image/png", "video/mp4").
 */
export type MimeType = Brand<string, 'MimeType'>;

/**
 * @brief Checks whether the given value is a well-formed MIME type.
 * @param value - The value to check.
 * @returns Whether the value is a valid MimeType.
 */
export const isMimeType = (value: string): value is MimeType => MIME_TYPE_PATTERN.test(value);
