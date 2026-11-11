// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '../organization';
import type { LicenseIdentifier, Url } from '@gp/types';

/**
 * @brief A generic representation of a repository with basic properties and methods.
 */
export class GenericRepository {
  public static readonly displayName: string = '.github';
  public static readonly description: string = '';

  public static readonly license: LicenseIdentifier = 'MIT';
  public static readonly isPrivate: boolean = false;

  /**
   * @brief Returns the URL of the repository under the organization's GitHub account.
   * @returns The URL of the repository as a string.
   * @example
   * ```ts
   * const url = GenericRepository.url; // "https://github.com/GraphicalPlayground/.github"
   * ```
   */
  public static get url(): Url {
    return Organization.repository(this.displayName);
  }

  /**
   * @brief Returns the canonical SPDX URL describing the repository's license.
   * @returns The URL of the license as a string.
   * @example
   * ```ts
   * const licenseUrl = GenericRepository.licenseUrl; // "https://spdx.org/licenses/MIT.html"
   * ```
   */
  public static get licenseUrl(): Url {
    return `https://spdx.org/licenses/${this.license}.html` as Url;
  }

  /**
   * @brief Converts the repository's properties to a JSON representation.
   * @returns An object containing the repository's properties in JSON format.
   * @example
   * ```ts
   * const repositoryJson = GenericRepository.toJSON();
   * console.log(repositoryJson);
   * ```
   */
  public static toJSON() {
    return {
      name: this.displayName,
      description: this.description,
      url: this.url,
      license: this.license,
      licenseUrl: this.licenseUrl,
      isPrivate: this.isPrivate
    };
  }
}
