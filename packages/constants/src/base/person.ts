// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Organization } from '../organization';
import type { Email, Locale, SocialPlatform, Url, Pronouns } from '@gp/types';

/**
 * @brief A generic representation of a person with basic properties and methods.
 */
export class GenericPerson {
  public static readonly firstName: string = 'Generic';
  public static readonly lastName: string = 'Person';
  public static readonly alternateName: string = 'GP';

  public static readonly pronouns: Pronouns = 'they/them';

  public static readonly position: string = 'Non Existing Person';

  public static readonly url: Url = 'https://graphical-playground.com' as Url;

  public static readonly locales = {
    spoken: ['en-US', 'fr-FR'] as Locale[],
    preferred: 'en-US' as Locale
  };

  /**
   * @brief Returns the full name of the person by combining the first name and last name.
   * @returns The full name of the person as a string.
   * @example
   * ```ts
   * const fullName = GenericPerson.fullName; // "Generic Person"
   * ```
   */
  public static get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * @brief Returns the initials of the person by taking the first character of the first and last name.
   * @returns The initials of the person as a string.
   * @example
   * ```ts
   * const initials = GenericPerson.initials; // "GP"
   * ```
   */
  public static get initials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`;
  }

  /**
   * @brief Generates a slug for the person by combining the first name and last name in lowercase, separated by the specified divider.
   * @param divider - The string to use as a divider between the first name and last name in the slug. Defaults to '-'.
   * @returns The generated slug as a string.
   * @example
   * ```ts
   * const slug = GenericPerson.slug(); // "generic-person"
   * const customSlug = GenericPerson.slug('_'); // "generic_person"
   * ```
   */
  public static slug(divider: string = '-'): string {
    return `${this.firstName.toLowerCase()}${divider}${this.lastName.toLowerCase()}`;
  }

  /**
   * @brief Returns the email address of the person based on their slug and the organization's domain.
   * @returns The email address of the person as a string.
   * @example
   * ```ts
   * const email = GenericPerson.email; // "generic.person@graphical-playground.com"
   * ```
   */
  public static get email(): Email {
    return Organization.mail(this.slug('.'));
  }

  /**
   * @brief Returns a mailto link for the person's email address.
   * @returns A string representing the mailto link for the person's email address.
   * @example
   * ```ts
   * const mailto = GenericPerson.mailto; // "mailto:generic.person@graphical-playground.com"
   * ```
   */
  public static get mailto(): string {
    return `mailto:${this.email}`;
  }

  public static readonly socials: Partial<Record<SocialPlatform, Url>> = {};
  public static readonly emails: Email[] = [this.email] as Email[];

  /**
   * @brief Converts the person's properties to a JSON representation.
   * @returns An object containing the person's properties in JSON format.
   * @example
   * ```ts
   * const personJson = GenericPerson.toJSON();
   * console.log(personJson);
   * ```
   */
  public static toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      initials: this.initials,
      position: this.position,
      slug: this.slug(),
      email: this.email,
      emails: this.emails,
      socials: this.socials,
      locales: this.locales,
      url: this.url,
      pronouns: this.pronouns
    };
  }
}
