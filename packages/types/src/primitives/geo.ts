// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

/**
 * @brief Represents a geographic coordinate pair.
 */
export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

/**
 * @brief Checks whether the given value is a well-formed GeoCoordinates value.
 * @param value - The value to check.
 * @returns Whether the value is a valid GeoCoordinates.
 */
export const isGeoCoordinates = (value: unknown): value is GeoCoordinates =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as GeoCoordinates).latitude === 'number' &&
  typeof (value as GeoCoordinates).longitude === 'number' &&
  (value as GeoCoordinates).latitude >= MIN_LATITUDE &&
  (value as GeoCoordinates).latitude <= MAX_LATITUDE &&
  (value as GeoCoordinates).longitude >= MIN_LONGITUDE &&
  (value as GeoCoordinates).longitude <= MAX_LONGITUDE;
