// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Locale, SocialPlatform, Url, Email, Pronouns } from '@gp/types';
import { GenericPerson } from '../base/person';

export class OssanMsoili extends GenericPerson {
  public static readonly firstName: string = 'Ossan';
  public static readonly lastName: string = 'Msoili';
  public static readonly alternateName: string = 'Omegalpha28';

  public static readonly pronouns: Pronouns = 'he/him';

  public static readonly position: string = 'Co-Founder & DevOps Engineer';

  public static readonly socials: Partial<Record<SocialPlatform, Url>> = {
    linkedin: 'https://linkedin.com/in/ossan-msoili' as Url,
    github: 'https://github.com/Omegalpha28' as Url
  };

  public static readonly url: Url = this.socials.github! as Url;

  public static readonly locales = {
    spoken: ['en', 'fr'] as Locale[],
    preferred: 'fr' as Locale
  };

  public static readonly emails: Email[] = [this.email, `${this.slug('.')}@epitech.eu`] as Email[];
}
