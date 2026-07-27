// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { buildBreadcrumbJsonLd } from '../jsonld/breadcrumb';
import type { BreadcrumbItem } from '../jsonld/breadcrumb';
import { JsonLd } from './JsonLd';

/**
 * @brief Props for the BreadcrumbJsonLd component.
 */
export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * @brief Renders the JSON-LD `BreadcrumbList` for a breadcrumb trail.
 * @details Render this right next to your visual breadcrumb component, passing it the exact same `items` array, so
 * the structured data can never drift from what's actually shown on the page.
 */
export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => <JsonLd data={buildBreadcrumbJsonLd(items)} />;
