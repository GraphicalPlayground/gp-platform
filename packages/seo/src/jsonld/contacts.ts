// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ContactPoint, WithContext } from 'schema-dts';
import { Organization } from '@gp/constants';
import { JsonLdIds } from './ids';
import type { ContactSlug } from './ids';

/**
 * @brief Generates a JSON-LD representation of a ContactPoint for the Graphical Playground platform.
 * @param slug - The slug representing the contact type (e.g., 'support', 'legal', etc.).
 * @returns A WithContext<ContactPoint> object representing the contact point.
 */
const generateContactPoint = (slug: ContactSlug): WithContext<ContactPoint> => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPoint',
  '@id': JsonLdIds.contact(slug),
  'email': Organization.mailto(slug),
  'contactType': slug,
  'availableLanguage': [{ '@id': JsonLdIds.language('en') }, { '@id': JsonLdIds.language('fr') }]
});

/**
 * @brief A collection of JSON-LD representations of ContactPoints for the Graphical Playground platform.
 * @details Each contact point is generated using the generateContactPoint function and is keyed by its corresponding ContactSlug.
 */
export const contacts: Record<ContactSlug, WithContext<ContactPoint>> = {
  legal: generateContactPoint('legal'),
  press: generateContactPoint('press'),
  sales: generateContactPoint('sales'),
  security: generateContactPoint('security'),
  support: generateContactPoint('support')
};
