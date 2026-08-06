// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Locale, SocialPlatform, Url, Email, Pronouns } from '@gp/types';
import { GenericPerson } from '../base/person';

export class RaphaelOstier extends GenericPerson {
  public static override readonly firstName: string = 'Raphael';
  public static override readonly lastName: string = 'Ostier';
  public static override readonly alternateName: string = 'Bombabobo';

  public static override readonly pronouns: Pronouns = 'he/him';

  public static override readonly position: string = 'Co-Founder & Frontend Developer';

  public static override readonly socials: Partial<Record<SocialPlatform, Url>> = {
    linkedin: 'https://linkedin.com/in/raphael-ostier' as Url,
    github: 'https://github.com/bombabobo' as Url
  };

  public static override readonly url: Url = this.socials.github! as Url;

  public static override readonly locales = {
    spoken: ['en', 'fr'] as Locale[],
    preferred: 'fr' as Locale
  };

  public static override readonly emails: Email[] = [this.email, `${this.slug('.')}@epitech.eu`] as Email[];
}
