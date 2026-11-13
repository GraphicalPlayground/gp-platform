// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const COMBINING_DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

/**
 * @brief Represents a URL-safe, lowercase, hyphen-separated identifier (e.g. "my-article-title").
 */
export type Slug = Brand<string, 'Slug'>;

/**
 * @brief Checks whether the given value is a well-formed Slug.
 * @param value - The value to check.
 * @returns Whether the value is a valid Slug.
 */
export const isSlug = (value: string): value is Slug => SLUG_PATTERN.test(value);

/**
 * @brief Converts an arbitrary string into a well-formed Slug.
 * @param value - The string to slugify.
 * @returns The slugified value.
 */
export const toSlug = (value: string): Slug =>
  value
    .normalize('NFKD')
    .replace(COMBINING_DIACRITICS_PATTERN, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') as Slug;
