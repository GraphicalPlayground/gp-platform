// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Locale, SocialPlatform, Url, Email, Pronouns } from '@gp/types';
import { GenericPerson } from '../base/person';

export class MalloryScotton extends GenericPerson {
  public static readonly firstName: string = 'Mallory';
  public static readonly lastName: string = 'Scotton';
  public static readonly alternateName: string = 'Mallow';

  public static readonly pronouns: Pronouns = 'he/him';

  public static readonly position: string = 'Founder & Technical Architect';

  public static readonly socials: Partial<Record<SocialPlatform, Url>> = {
    linkedin: 'https://linkedin.com/in/mallory-scotton' as Url,
    github: 'https://github.com/mallory-scotton' as Url
  };

  public static readonly url: Url = this.socials.github! as Url;

  public static readonly locales = {
    spoken: ['en', 'fr'] as Locale[],
    preferred: 'fr' as Locale
  };

  public static readonly emails: Email[] = [
    this.email,
    `${this.slug('.')}@epitech.eu`,
    'mscotton.pro@gmail.com'
  ] as Email[];
}
