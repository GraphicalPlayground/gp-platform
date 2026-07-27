// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { organization } from './organization';
import { people } from './people';
import { languages } from './languages';
import { contacts } from './contacts';
import { localization } from './localization';
import { website } from './website';
import { softwaresSourceCode, softwaresApplication } from './softwares';

export * from './ids';
export * from './article';
export * from './breadcrumb';
export * from './faq';

/**
 * @brief A collection of JSON-LD representations of the Graphical Playground platform.
 */
export const graph = [
  organization,
  ...Object.values(people),
  ...Object.values(languages),
  ...Object.values(contacts),
  localization,
  website,
  ...Object.values(softwaresSourceCode),
  ...Object.values(softwaresApplication)
];

/* Forward exports */
export { organization, people, languages, contacts, localization, website, softwaresSourceCode, softwaresApplication };
