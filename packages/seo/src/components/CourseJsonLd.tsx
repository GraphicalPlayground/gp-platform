// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { buildCourseJsonLd } from '../jsonld/course';
import type { CourseJsonLdInput } from '../jsonld/course';
import { JsonLd } from './JsonLd';

/**
 * @brief Props for the CourseJsonLd component.
 */
export interface CourseJsonLdProps extends CourseJsonLdInput {}

/**
 * @brief Renders the JSON-LD `Course` for a course page.
 * @details Render this right next to the visual course page content, sourcing the same name/price/rating that's
 * actually displayed, so the structured data can never drift from what's shown.
 */
export const CourseJsonLd = (props: CourseJsonLdProps) => <JsonLd data={buildCourseJsonLd(props)} />;
