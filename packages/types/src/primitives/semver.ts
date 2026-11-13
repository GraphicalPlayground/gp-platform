// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/* Official semver.org grammar, see https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string */
const SEMVER_PATTERN =
  /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * @brief Represents a semantic version string (e.g. "1.4.2", "2.0.0-beta.1").
 */
export type Semver = Brand<string, 'Semver'>;

/**
 * @brief Represents the parsed components of a Semver.
 */
export interface SemverParts {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  buildMetadata?: string;
}

/**
 * @brief Checks whether the given value is a well-formed semantic version string.
 * @param value - The value to check.
 * @returns Whether the value is a valid Semver.
 */
export const isSemver = (value: string): value is Semver => SEMVER_PATTERN.test(value);

/**
 * @brief Parses a Semver into its major, minor, patch, prerelease and build metadata components.
 * @param version - The semantic version string to parse.
 * @returns The parsed components of the version.
 */
export const parseSemver = (version: Semver): SemverParts => {
  const match = SEMVER_PATTERN.exec(version);

  if (!match?.groups) {
    throw new Error(`Invalid Semver: ${version}`);
  }

  const { major, minor, patch, prerelease, buildmetadata } = match.groups;

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    prerelease,
    buildMetadata: buildmetadata
  };
};
