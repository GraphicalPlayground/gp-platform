// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Locale, SocialPlatform, Url, Email, Pronouns } from '@gp/types';
import { GenericPerson } from '../person';

export class RaphaelOstier extends GenericPerson {
  public static readonly firstName: string = 'Raphael';
  public static readonly lastName: string = 'Ostier';
  public static readonly alternateName: string = 'Bombabobo';

  public static readonly pronouns: Pronouns = 'he/him';

  public static readonly position: string = 'Co-Founder & Frontend Developer';

  public static readonly socials: Partial<Record<SocialPlatform, Url>> = {
    linkedin: 'https://linkedin.com/in/raphael-ostier' as Url,
    github: 'https://github.com/bombabobo' as Url
  };

  public static readonly url: Url = this.socials.github! as Url;

  public static readonly locales = {
    spoken: ['en', 'fr'] as Locale[],
    preferred: 'fr' as Locale
  };

  public static readonly emails: Email[] = [this.email, `${this.slug('.')}@epitech.eu`] as Email[];
}
