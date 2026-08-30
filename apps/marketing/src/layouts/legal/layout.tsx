// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { SplitPageLayout } from '@primer/react';
import { NavList, Accordion } from '@gp/ui/components';
import type { MdxCollection, LegalFrontmatter } from '@gp/content';
import { usePathname } from 'next/navigation';
import { SubdomainNavBarHeader } from '@/components/header';

/**
 * @brief Props for the LegalLayoutClient component.
 */
interface LegalLayoutClientProps {
  docs: Awaited<ReturnType<MdxCollection<LegalFrontmatter>['getAll']>>;
  children: React.ReactNode;
}

/**
 * @brief Client-side layout component for legal documents.
 * @returns A React functional component that renders a split-page layout with a navigation list of legal documents and the main content area.
 */
export const LegalLayoutClient: React.FC<LegalLayoutClientProps> = ({ children, docs }) => {
  const pathname = usePathname();
  const currentSlug = pathname?.replace('/legal/', '') || '';

  return (
    <>
      <SubdomainNavBarHeader fixed={false} links={[]} title='Legal' />
      <SplitPageLayout>
        <SplitPageLayout.Pane padding='none' position='start'>
          <Accordion className='block md:hidden' variant='emphasis'>
            <Accordion.Heading>Legal Documents</Accordion.Heading>
            <Accordion.Content>
              <NavList aria-label='Legal documents navigation'>
                {docs.map((doc) => (
                  <NavList.Item
                    key={doc.frontmatter.slug}
                    aria-current={doc.frontmatter.slug === currentSlug ? 'page' : undefined}
                    href={`/legal/${doc.frontmatter.slug}`}
                    title={doc.frontmatter.title}
                  >
                    {doc.frontmatter.title}
                  </NavList.Item>
                ))}
              </NavList>
            </Accordion.Content>
          </Accordion>
          <NavList aria-label='Legal documents navigation' className='hidden md:block'>
            <NavList.Group title='Legal Documents'>
              {docs.map((doc) => (
                <NavList.Item
                  key={doc.frontmatter.slug}
                  aria-current={doc.frontmatter.slug === currentSlug ? 'page' : undefined}
                  href={`/legal/${doc.frontmatter.slug}`}
                  title={doc.frontmatter.title}
                >
                  {doc.frontmatter.title}
                </NavList.Item>
              ))}
            </NavList.Group>
          </NavList>
        </SplitPageLayout.Pane>
        <SplitPageLayout.Content>{children}</SplitPageLayout.Content>
      </SplitPageLayout>
    </>
  );
};
