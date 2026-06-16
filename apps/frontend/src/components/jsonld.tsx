// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Thing, WithContext } from 'schema-dts';

/**
 * @brief Props for the JsonLd component.
 */
export interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[];
}

/**
 * @brief A component that injects JSON-LD structured data into the HTML document head.
 * @param data - The JSON-LD data to be injected.
 * @returns A script element containing the JSON-LD data.
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
};
