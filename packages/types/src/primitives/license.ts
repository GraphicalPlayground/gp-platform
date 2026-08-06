// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief The SPDX license identifiers supported out of the box by the Graphical Playground platform.
 */
export type StandardLicenseIdentifier =
  | 'MIT'
  | 'Apache-2.0'
  | 'GPL-2.0'
  | 'GPL-3.0'
  | 'LGPL-2.1'
  | 'LGPL-3.0'
  | 'AGPL-3.0'
  | 'BSD-2-Clause'
  | 'BSD-3-Clause'
  | 'MPL-2.0'
  | 'ISC'
  | 'Unlicense'
  | 'CC0-1.0'
  | 'CC-BY-4.0'
  | 'CC-BY-SA-4.0'
  | 'EPL-2.0'
  | 'Proprietary';

/**
 * @brief Represents an SPDX license identifier, including standard identifiers and any custom identifier.
 */
export type LicenseIdentifier = StandardLicenseIdentifier | (string & {});
