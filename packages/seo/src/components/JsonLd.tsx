// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Thing, WithContext, Graph } from 'schema-dts';

/**
 * @brief Props for the JsonLd component.
 */
export interface JsonLdProps<T extends Thing> extends Omit<
  React.HTMLAttributes<HTMLScriptElement>,
  'children' | 'src' | 'dangerouslySetInnerHTML'
> {
  /**
   * @brief The JSON-LD data to be rendered as a string.
   */
  data: WithContext<T> | Graph | WithContext<T>[];

  /**
   * @brief The number of spaces to use for indentation in the JSON-LD string.
   * @default 2
   */
  indent?: number;
}

/**
 * @brief A React component that renders JSON-LD data as a script tag.
 * @details This component is XSS-safe and prevents the execution of any scripts within the JSON-LD data.
 */
export const JsonLd = <T extends Thing>({ data, indent = 2, ...rest }: JsonLdProps<T>) => {
  if (Array.isArray(data)) {
    const graphData: Graph = { '@context': 'https://schema.org', '@graph': data };
    const jsonString = JSON.stringify(graphData, null, indent);
    const xssSafeData = jsonString.replace(/</g, String.raw`\u003c`).replace(/>/g, String.raw`\u003e`);

    return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: xssSafeData }} {...rest} />;
  }

  const jsonString = JSON.stringify(data, null, indent);
  const xssSafeData = jsonString.replace(/</g, String.raw`\u003c`).replace(/>/g, String.raw`\u003e`);

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: xssSafeData }} {...rest} />;
};
