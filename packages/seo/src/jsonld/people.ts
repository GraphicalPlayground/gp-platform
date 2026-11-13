// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { WithContext, Person } from 'schema-dts';
import type { Url } from '@gp/types';
import { Persons } from '@gp/constants';
import { JsonLdIds } from './ids';
import type { PersonSlug, LanguageSlug } from './ids';

type PersonClass = (typeof Persons)[keyof typeof Persons];

/**
 * @brief Maps each team member's URL slug to their `@gp/constants` representation, the single source of truth for
 * name, title, pronouns, contact, and social data.
 */
const PERSONS: Record<PersonSlug, PersonClass> = {
  'mallory-scotton': Persons.MalloryScotton,
  'hugo-cathelain': Persons.HugoCathelain,
  'nathan-fievet': Persons.NathanFievet,
  'ossan-msoili': Persons.OssanMsoili,
  'raphael-ostier': Persons.RaphaelOstier
};

const PERSON_SLUGS = Object.keys(PERSONS) as PersonSlug[];

/**
 * @brief Builds the JSON-LD `Person` representation of a Graphical Playground team member.
 * @param slug - The slug identifying the person, matching a key of {@link PERSONS}.
 * @returns A WithContext<Person> object representing the person.
 */
const buildPersonJsonLd = (slug: PersonSlug): WithContext<Person> => {
  const person = PERSONS[slug];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': JsonLdIds.person(slug),
    'name': person.fullName,
    'givenName': person.firstName,
    'alternateName': person.alternateName,
    'jobTitle': person.position,
    'pronouns': person.pronouns,
    'affiliation': { '@id': JsonLdIds.organization },
    'brand': { '@id': JsonLdIds.organization },
    'funder': { '@id': JsonLdIds.organization },
    'memberOf': { '@id': JsonLdIds.organization },
    'worksFor': { '@id': JsonLdIds.organization },
    'colleague': PERSON_SLUGS.filter((other) => other !== slug).map((other) => ({ '@id': JsonLdIds.person(other) })),
    'email': person.mailto,
    'knowsLanguage': person.locales.spoken.map((lang) => ({ '@id': JsonLdIds.language(lang as LanguageSlug) })),
    'url': person.url,
    'sameAs': Object.values(person.socials).filter((url): url is Url => url !== undefined)
  };
};

/**
 * @brief A collection of JSON-LD representations of people associated with the Graphical Playground platform.
 */
export const people: Record<PersonSlug, WithContext<Person>> = Object.fromEntries(
  PERSON_SLUGS.map((slug) => [slug, buildPersonJsonLd(slug)])
) as Record<PersonSlug, WithContext<Person>>;
