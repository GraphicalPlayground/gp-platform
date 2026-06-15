// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MDXComponents } from 'mdx/types';
import { MdxLink } from './components/mdx-link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }) => (
      <MdxLink href={href as string} style={{ fontSize: 'inherit', color: 'inherit' }} {...props}>
        {children}
      </MdxLink>
    ),
    h1: ({ children, ...props }) => (
      <h1 className='text-6xl mb-4 scroll-mt-24' {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className='text-4xl mb-4 mt-12 scroll-mt-24' {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className='text-2xl mb-4 mt-6 scroll-mt-24' {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className='text-xl mb-4 mt-4 scroll-mt-24' {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className='text-base xl:text-lg leading-[1.6] my-4 mb-4' {...props}>
        {children}
      </p>
    )
  };
}
