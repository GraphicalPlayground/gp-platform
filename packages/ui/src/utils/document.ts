// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

/**
 * @brief NodeProps interface for React elements.
 * @details This interface defines the props that can be passed to a React element.
 * It includes an optional `children` prop for nested elements, an optional `id` prop for unique identification,
 * and allows any other additional props of unknown types.
 */
interface NodeProps {
  children?: React.ReactNode;
  id?: string;
  [key: string]: unknown;
}

/**
 * @brief Extracts text content from a React node tree.
 * @param node - The React node tree to extract text from.
 * @returns A string containing the concatenated text content of the node tree.
 */
export const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (React.isValidElement(node)) {
    const props = node.props as NodeProps;

    return extractText(props.children);
  }

  return '';
};

/**
 * @brief Extracts headings from a React node tree.
 * @param node - The React node tree to extract headings from.
 * @param headingType - The type of heading to extract (e.g., 'h1', 'h2', etc.).
 * @returns An array of objects containing the id and text of each heading.
 */
export const extractHeadings = (
  node: React.ReactNode,
  headingType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
): { id: string; text: string }[] => {
  let headings: { id: string; text: string }[] = [];

  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props as NodeProps;

    if (child.type === headingType) {
      const id = props.id;
      const text = extractText(props.children);

      if (typeof id === 'string' && text) {
        headings.push({ id, text });
      }
    } else if (props.children) {
      headings = headings.concat(extractHeadings(props.children, headingType));
    }
  });

  return headings;
};
