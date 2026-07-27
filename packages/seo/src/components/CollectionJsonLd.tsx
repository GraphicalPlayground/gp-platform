// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { buildCollectionPageJsonLd } from '../jsonld/collection';
import type { CollectionPageJsonLdInput } from '../jsonld/collection';
import { JsonLd } from './JsonLd';

/**
 * @brief Props for the CollectionJsonLd component.
 */
export interface CollectionJsonLdProps extends CollectionPageJsonLdInput {}

/**
 * @brief Renders the JSON-LD `CollectionPage`/`ItemList` for a catalog or listing page.
 * @details Render this right next to the visual listing component, passing it the exact same `items` array, so the
 * structured data can never drift from what's actually shown on the page.
 */
export const CollectionJsonLd = (props: CollectionJsonLdProps) => <JsonLd data={buildCollectionPageJsonLd(props)} />;
