// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/* Building blocks shared by the CSS color function patterns below. */
const CHANNEL = String.raw`(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d|(?:100|[1-9]?\d)%)`;
const PERCENT = String.raw`(?:100|[1-9]?\d)%`;
const ALPHA = String.raw`(?:0|1|0?\.\d+|(?:100|[1-9]?\d)%)`;
const HUE = String.raw`-?(?:\d+(?:\.\d+)?)(?:deg|grad|rad|turn)?`;
const SEP = String.raw`(?:\s*,\s*|\s+)`;
const ALPHA_SEP = String.raw`(?:\s*,\s*|\s*/\s*)`;

const RGB_COLOR_PATTERN = new RegExp(String.raw`^rgb\(\s*${CHANNEL}${SEP}${CHANNEL}${SEP}${CHANNEL}\s*\)$`, 'i');
const RGBA_COLOR_PATTERN = new RegExp(
  String.raw`^rgba?\(\s*${CHANNEL}${SEP}${CHANNEL}${SEP}${CHANNEL}${ALPHA_SEP}${ALPHA}\s*\)$`,
  'i'
);
const HSL_COLOR_PATTERN = new RegExp(String.raw`^hsl\(\s*${HUE}${SEP}${PERCENT}${SEP}${PERCENT}\s*\)$`, 'i');
const HSLA_COLOR_PATTERN = new RegExp(
  String.raw`^hsla?\(\s*${HUE}${SEP}${PERCENT}${SEP}${PERCENT}${ALPHA_SEP}${ALPHA}\s*\)$`,
  'i'
);
const HWB_COLOR_PATTERN = new RegExp(
  String.raw`^hwb\(\s*${HUE}${SEP}${PERCENT}${SEP}${PERCENT}(?:${ALPHA_SEP}${ALPHA})?\s*\)$`,
  'i'
);

/**
 * @brief Represents a hexadecimal color (e.g. "#FFF", "#0A84FF", "#0A84FFCC").
 */
export type HexColor = Brand<string, 'HexColor'>;

/**
 * @brief Represents an RGB color function (e.g. "rgb(10, 132, 255)", "rgb(10 132 255)").
 */
export type RgbColor = Brand<string, 'RgbColor'>;

/**
 * @brief Represents an RGB color function with an alpha channel (e.g. "rgba(10, 132, 255, 0.8)", "rgb(10 132 255 / 80%)").
 */
export type RgbaColor = Brand<string, 'RgbaColor'>;

/**
 * @brief Represents an HSL color function (e.g. "hsl(210, 100%, 52%)", "hsl(210 100% 52%)").
 */
export type HslColor = Brand<string, 'HslColor'>;

/**
 * @brief Represents an HSL color function with an alpha channel (e.g. "hsla(210, 100%, 52%, 0.8)", "hsl(210 100% 52% / 80%)").
 */
export type HslaColor = Brand<string, 'HslaColor'>;

/**
 * @brief Represents an HWB color function (e.g. "hwb(210 10% 0%)", "hwb(210 10% 0% / 80%)").
 */
export type HwbColor = Brand<string, 'HwbColor'>;

/**
 * @brief Represents any supported CSS color format.
 */
export type CssColor = HexColor | RgbColor | RgbaColor | HslColor | HslaColor | HwbColor;

/**
 * @brief Checks whether the given value is a well-formed hexadecimal color.
 * @param value - The value to check.
 * @returns Whether the value is a valid HexColor.
 */
export const isHexColor = (value: string): value is HexColor => HEX_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed RGB color function.
 * @param value - The value to check.
 * @returns Whether the value is a valid RgbColor.
 */
export const isRgbColor = (value: string): value is RgbColor => RGB_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed RGB color function with an alpha channel.
 * @param value - The value to check.
 * @returns Whether the value is a valid RgbaColor.
 */
export const isRgbaColor = (value: string): value is RgbaColor => RGBA_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed HSL color function.
 * @param value - The value to check.
 * @returns Whether the value is a valid HslColor.
 */
export const isHslColor = (value: string): value is HslColor => HSL_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed HSL color function with an alpha channel.
 * @param value - The value to check.
 * @returns Whether the value is a valid HslaColor.
 */
export const isHslaColor = (value: string): value is HslaColor => HSLA_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed HWB color function.
 * @param value - The value to check.
 * @returns Whether the value is a valid HwbColor.
 */
export const isHwbColor = (value: string): value is HwbColor => HWB_COLOR_PATTERN.test(value);

/**
 * @brief Checks whether the given value is a well-formed CSS color in any supported format.
 * @param value - The value to check.
 * @returns Whether the value is a valid CssColor.
 */
export const isCssColor = (value: string): value is CssColor =>
  isHexColor(value) ||
  isRgbColor(value) ||
  isRgbaColor(value) ||
  isHslColor(value) ||
  isHslaColor(value) ||
  isHwbColor(value);
