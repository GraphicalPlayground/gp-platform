// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { buildWebPageJsonLd } from '../jsonld/webpage';
import type { WebPageJsonLdInput, WebPageSchemaUnion } from '../jsonld/webpage';
import { JsonLd } from './JsonLd';

/**
 * @brief Props for the WebPageJsonLd component.
 */
export interface WebPageJsonLdProps extends WebPageJsonLdInput {}

/**
 * @brief Renders the JSON-LD `WebPage` (or `AboutPage`/`ContactPage`...) entity for a marketing or legal route.
 */
export const WebPageJsonLd = (props: WebPageJsonLdProps) => (
  <JsonLd<WebPageSchemaUnion> data={buildWebPageJsonLd(props)} />
);
