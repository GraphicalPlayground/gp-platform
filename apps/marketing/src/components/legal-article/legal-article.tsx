// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useRef } from 'react';
import type { CompiledMdxDocument, LegalFrontmatter } from '@gp/content';
import { JsonLdIds } from '@gp/seo/jsonld';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import { WebPageJsonLd } from '@gp/seo/react';
import { Box, Grid, Hero, Link, Prose, Section, Stack, TableOfContents, Text, Token } from '@gp/ui/components';
import { useCurrentVisibleHeading } from '@gp/ui/hooks';
import { BreadcrumbsList } from '../article/components';
import { LEGAL_CATEGORY_VISUALS } from '../legal-index/components';
import { formatUtcDate } from '../legal-index/legal-index.utils';
import styles from './legal-article.module.css';

export interface LegalArticleProps {
  document: CompiledMdxDocument<LegalFrontmatter>;
}

/**
 * @brief Full-width legal document viewer with breadcrumbs, enhanced hero metadata, editorial prose, and sticky table of contents.
 */
export const LegalArticle: React.FC<LegalArticleProps> = ({ document }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const currentVisibleHeading = useCurrentVisibleHeading({ ref: contentRef });
  const { frontmatter, headings } = document;

  const categoryVisual = LEGAL_CATEGORY_VISUALS[frontmatter.category];
  const CategoryIcon = categoryVisual.icon;
  const tocItems = headings.filter((heading) => heading.level === 'h2');
  const effectiveLabel = formatUtcDate(frontmatter.effectiveDate, 'long');
  const updatedLabel = frontmatter.updateDate ? formatUtcDate(frontmatter.updateDate, 'long') : undefined;

  const legalPath = `/legal/${frontmatter.slug}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Legal', path: '/legal' },
    { name: frontmatter.title, path: legalPath }
  ];

  return (
    <>
      <WebPageJsonLd
        hasBreadcrumb
        about={{ '@id': JsonLdIds.organization }}
        dateModified={(frontmatter.updateDate ?? frontmatter.effectiveDate).toISOString()}
        datePublished={frontmatter.effectiveDate.toISOString()}
        description={frontmatter.summary}
        inLanguage={frontmatter.locale}
        name={frontmatter.title}
        path={legalPath}
        version={frontmatter.version}
      />
      <Section
        fullWidth
        backgroundColor='subtle'
        className={styles.headerSection}
        paddingBlockEnd='normal'
        paddingBlockStart='condensed'
      >
        <Grid className={styles.headerGrid}>
          <Grid.Column span={12}>
            <BreadcrumbsList selectLastItem items={breadcrumbs} />
          </Grid.Column>

          <Grid.Column span={12}>
            <Hero className={styles.hero}>
              <Hero.Label>{`Legal · ${categoryVisual.label}`}</Hero.Label>
              <Hero.Heading>{frontmatter.title}</Hero.Heading>
              <Hero.Description>{frontmatter.summary}</Hero.Description>
            </Hero>
          </Grid.Column>

          <Grid.Column span={12}>
            <div className={styles.metaRow}>
              <Stack alignItems='center' direction='horizontal' flexWrap='wrap' gap={8} padding='none'>
                <Token leadingVisual={<CategoryIcon size={16} />} variant='default'>
                  {categoryVisual.label}
                </Token>
                <Token variant='outline'>{`Version ${frontmatter.version}`}</Token>
                {frontmatter.requiresExplicitConsent ? <Token variant='accent'>Explicit consent</Token> : null}
              </Stack>

              <Text as='p' className={styles.metaDates} font='monospace' size='100' variant='muted'>
                <span>
                  Effective <time dateTime={frontmatter.effectiveDate.toISOString()}>{effectiveLabel}</time>
                </span>
                {frontmatter.updateDate && updatedLabel && updatedLabel !== effectiveLabel ? (
                  <span>
                    · Updated <time dateTime={frontmatter.updateDate.toISOString()}>{updatedLabel}</time>
                  </span>
                ) : null}
                {frontmatter.reviewedBy ? <span>{`· Reviewed by ${frontmatter.reviewedBy}`}</span> : null}
              </Text>
            </div>
          </Grid.Column>
        </Grid>
      </Section>

      <Box paddingBlockEnd={{ narrow: 48, regular: 80 }} paddingBlockStart={{ narrow: 36, regular: 64 }}>
        <Grid className={styles.bodyGrid}>
          <Grid.Column span={{ xsmall: 12, large: 7 }}>
            <div ref={contentRef}>
              <Prose variant='editorial'>{document.content}</Prose>
            </div>

            <Box
              borderBlockStartWidth='thin'
              borderColor='muted'
              borderStyle='solid'
              marginBlockStart={{ narrow: 40, regular: 48 }}
              paddingBlockStart={28}
            >
              <Stack
                alignItems={{ narrow: 'flex-start', regular: 'center' }}
                direction={{ narrow: 'vertical', regular: 'horizontal' }}
                gap={16}
                justifyContent='space-between'
                padding='none'
              >
                <Link arrowDirection='start' href='/legal' variant='default'>
                  All legal documents
                </Link>
                <Link arrowDirection='end' href='/contact' variant='accent'>
                  Questions? Contact our legal team
                </Link>
              </Stack>
            </Box>
          </Grid.Column>

          {tocItems.length > 1 ? (
            <Grid.Column className={styles.tocColumn} span={{ xsmall: 12, large: 4 }} start={{ large: 9 }}>
              <TableOfContents active={currentVisibleHeading} items={tocItems} />
            </Grid.Column>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};
