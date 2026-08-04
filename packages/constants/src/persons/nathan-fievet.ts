// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Locale, SocialPlatform, Url, Email, Pronouns } from '@gp/types';
import { GenericPerson } from '../person';

export class NathanFievet extends GenericPerson {
  public static readonly firstName: string = 'Nathan';
  public static readonly lastName: string = 'Fievet';
  public static readonly alternateName: string = 'Natan';

  public static readonly pronouns: Pronouns = 'he/him';

  public static readonly position: string = 'Co-Founder & Graphics Engineer';

  public static readonly socials: Partial<Record<SocialPlatform, Url>> = {
    linkedin: 'https://linkedin.com/in/nathan-fievet' as Url,
    github: 'https://github.com/natan-fievet' as Url
  };

  public static readonly url: Url = this.socials.github! as Url;

  public static readonly locales = {
    spoken: ['en', 'fr'] as Locale[],
    preferred: 'en' as Locale
  };

  public static readonly emails: Email[] = [this.email, `${this.slug('.')}@epitech.eu`] as Email[];
}
