// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

/**
 * @brief Props for the Container component.
 * @see Container
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @brief A simple container component that centers its children and limits the maximum width to 1024px.
 * @param props - The properties for the Container component.
 * @param props.children - The child elements to be rendered inside the container.
 * @param [props.style] - Optional additional styles to apply to the container.
 * @returns A div element that wraps the children with the specified styles.
 */
export const Container: React.FC<ContainerProps> = ({ children, style, ...rest }) => (
  <div style={{ maxWidth: 1024, margin: '0 auto', ...style }} {...rest}>
    {children}
  </div>
);

/**
 * @brief Props for the RedlineBackground component.
 * @see RedlineBackground
 */
export interface RedlineBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @brief The height of the redline background.
   * @details If not provided, the height will be determined by the content.
   */
  height?: number;

  /**
   * @brief Whether to display a border around the redline background.
   * @default true
   */
  hasBorder?: boolean;
}

/**
 * @brief A component that renders a redline background with optional border and height.
 * @param props - The properties for the RedlineBackground component.
 * @param props.height - The height of the redline background. If not provided, the height will be determined by the content.
 * @param props.hasBorder - Whether to display a border around the redline background. Defaults to true.
 * @param [props.style] - Optional additional styles to apply to the redline background.
 * @returns A div element that displays a redline background with the specified height and border.
 */
export const RedlineBackground: React.FC<RedlineBackgroundProps> = ({ hasBorder = true, height, style, ...rest }) => (
  <div
    style={{
      display: 'flex',
      overflow: 'hidden',
      border: hasBorder ? '1px solid var(--base-color-scale-red-2)' : undefined,
      backgroundImage:
        'linear-gradient(45deg, var(--base-color-scale-red-0) 12.5%, #ffb5b380 12.5%, #ffb5b380 50%, var(--base-color-scale-red-0) 50%, var(--base-color-scale-red-0) 62.5%, #ffb5b380 62.5%, #ffb5b380 100%)', // hex value is scale-red-2 with 50% opacity
      backgroundSize: '5.66px 5.66px',
      WebkitBoxPack: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height,
      ...style
    }}
    {...rest}
  />
);

/**
 * @brief BaseProps interface for components that accept a generic type parameter T.
 */
export type BaseProps<T> = {
  className?: string;
  id?: string;
  ref?: React.Ref<T>;
};

/**
 * @brief Recursively extracts and concatenates text content from a React node.
 * @param node - The React node from which to extract text content.
 * @returns A string containing the concatenated text content of the node and its children.
 */
export function getTextContent(node: React.ReactNode): string {
  if (!node) return '';

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };

    return getTextContent(props.children);
  }

  return '';
}
