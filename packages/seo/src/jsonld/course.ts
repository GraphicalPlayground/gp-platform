// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { AggregateRating, Course, CourseInstance, WithContext } from 'schema-dts';
import { JsonLdIds } from './ids';
import { Urls } from '../utils';

/**
 * @brief JSON-LD `Course` type, augmented with `aggregateRating`.
 * @details Google's Course rich result documents `aggregateRating` directly on the `Course` entity, which isn't
 * part of schema.org's core `Course` vocabulary that `schema-dts` models — hence the local augmentation instead of
 * fighting the library's strict types.
 */
export type CourseJsonLd = WithContext<Course> & { aggregateRating?: AggregateRating };

/**
 * @brief A single offering of a course, distinct by time, location, or mode of study.
 */
export interface CourseInstanceInput {
  courseMode: 'online' | 'onsite' | 'blended';
  startDate?: string;
  endDate?: string;
  courseWorkload?: string;
  instructorName?: string;
}

/**
 * @brief A course's pricing, when it isn't free.
 */
export interface CourseOfferInput {
  price: number;
  priceCurrency: string;
}

/**
 * @brief A course's aggregate rating, as collected from student reviews.
 */
export interface CourseRatingInput {
  ratingValue: number;
  ratingCount: number;
  bestRating?: number;
  worstRating?: number;
}

/**
 * @brief Input for {@link buildCourseJsonLd}.
 */
export interface CourseJsonLdInput {
  name: string;
  description: string;

  /**
   * @brief Path the course is served at, e.g. `/courses/vulkan-fundamentals`.
   */
  path: string;

  image?: string;
  inLanguage?: string;
  educationalLevel?: string;
  prerequisites?: string;

  /**
   * @brief Offerings of the course. Defaults to a single self-paced online instance when omitted, since every
   * Graphical Playground course is delivered through the browser-based platform.
   */
  instances?: CourseInstanceInput[];

  offer?: CourseOfferInput;
  rating?: CourseRatingInput;
}

/**
 * @brief Builds the JSON-LD `Course` representation of a Graphical Playground course.
 * @details Pure data builder, meant to be rendered via a `<CourseJsonLd>` right next to the actual course page
 * content, from the exact same data the page displays — never fabricates a rating or price that isn't visibly
 * shown, the same rule `buildBreadcrumbJsonLd`/`buildFaqJsonLd` already follow.
 * @param input - The course's name, description, offerings, pricing, and rating.
 */
export const buildCourseJsonLd = (input: CourseJsonLdInput): CourseJsonLd => {
  const url = `${Urls.BaseUrl}${input.path}`;
  const instances = input.instances?.length ? input.instances : [{ courseMode: 'online' as const }];

  const hasCourseInstance: CourseInstance[] = instances.map((instance) => ({
    '@type': 'CourseInstance',
    'courseMode': instance.courseMode,
    ...(instance.startDate && { startDate: instance.startDate }),
    ...(instance.endDate && { endDate: instance.endDate }),
    ...(instance.courseWorkload && { courseWorkload: instance.courseWorkload }),
    ...(instance.instructorName && { instructor: { '@type': 'Person', 'name': instance.instructorName } })
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    'name': input.name,
    'description': input.description,
    'url': url,
    'provider': { '@id': JsonLdIds.organization },
    ...(input.image && { image: input.image }),
    ...(input.inLanguage && { inLanguage: input.inLanguage }),
    ...(input.educationalLevel && { educationalLevel: input.educationalLevel }),
    ...(input.prerequisites && { coursePrerequisites: input.prerequisites }),
    'hasCourseInstance': hasCourseInstance,
    ...(input.offer && {
      offers: {
        '@type': 'Offer',
        'price': String(input.offer.price),
        'priceCurrency': input.offer.priceCurrency,
        'url': url,
        'availability': 'https://schema.org/InStock'
      }
    }),
    ...(input.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        'ratingValue': input.rating.ratingValue,
        'ratingCount': input.rating.ratingCount,
        'bestRating': input.rating.bestRating ?? 5,
        'worstRating': input.rating.worstRating ?? 0
      }
    })
  };
};
