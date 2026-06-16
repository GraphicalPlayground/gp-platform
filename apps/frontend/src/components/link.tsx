// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { Link as BaseLink } from '@gp/react';
import NextLink from 'next/link';
import type { LinkProps as BaseLinkProps } from '@gp/react';

/**
 * @brief A wrapper around the BaseLink component that uses Next.js's Link component for client-side navigation.
 */
export interface LinkProps extends BaseLinkProps {
  href: string;
}

/**
 * @brief A wrapper around the BaseLink component that uses Next.js's Link component for client-side navigation.
 */
const LinkRoot: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <BaseLink
      href={href}
      {...props}
      render={({ ref, ...rest }) => <NextLink {...rest} href={href} ref={ref as React.Ref<HTMLAnchorElement>} />}
    >
      {children}
    </BaseLink>
  );
};

export const Link = Object.assign(LinkRoot, {
  Root: LinkRoot,
  Icon: BaseLink.Icon
});
