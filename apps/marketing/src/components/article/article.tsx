// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useRef } from 'react';
import styles from './article.module.css';

import { Box, Text, Stack, Grid, TableOfContents, Lede, Prose, Label } from '@gp/ui/components';
import type { CompiledMdxDocument, ArticleFrontmatter } from '@gp/content';
import { useCurrentVisibleHeading } from '@gp/ui/hooks';
import { SocialShare, BreadcrumbsList } from './components';
import type { BreadcrumbItem } from '@gp/seo/jsonld';
import Link from 'next/link';

interface AsideProps {
  // component: ResourceDetailsPage;
  locationUrl?: URL;
}

const Aside: React.FC<AsideProps> = () => {
  // const { featuredImage, form } = component.fields;

  // const handleOnSubmitted = useCallback(() => {
  //   if (locationUrl) {
  //     const queryParams = new URLSearchParams(ssrSafeLocation.search);
  //     const featureFlags = queryParams.get('_features') || '';
  //     window.location.href = appendFeatureFlagsToUrl(`${locationUrl.href}/confirmation`, featureFlags);
  //   }
  // }, [locationUrl]);

  // if (!(featuredImage || form)) {
  //   return null;
  // }

  return (
    <Stack data-testid='resource-details-aside' gap={32} padding='none'>
      {/* {featuredImage ? (
        <Box className={styles.hiddenOnMobile}>
          <Image
            as='picture'
            src={`${featuredImage.fields.file.url}?fm=webp`}
            sources={getImageSources(featuredImage.fields.file.url, { maxWidth: 640 })}
            alt={featuredImage.fields.description || ''}
            borderRadius='medium'
            aspectRatio='1:1'
            loading='lazy'
          />
        </Box>
      ) : null} */}
      {/* {form ? (
        <Box id='content-form'>
          <ContentfulForm
            component={form}
            headingProps={{ as: 'h2', size: '6' }}
            onSubmitted={handleOnSubmitted}
            padding='none'
          />
        </Box>
      ) : null} */}
    </Stack>
  );
};

interface TagsProps {
  tagsLabel: string;
  indexPath: string;
  tags: string[];
}

const Tags: React.FC<TagsProps> = ({ indexPath, tags, tagsLabel }) => {
  return (
    <Box
      borderBlockEndWidth='thin'
      borderColor='muted'
      borderStyle='solid'
      className={styles.tagsWrapper}
      paddingBlockEnd={40}
      paddingBlockStart={40}
    >
      <Stack direction='horizontal' flexWrap='wrap' padding='none'>
        <Text>{tagsLabel}</Text>
        {tags.map((tag) => {
          const href = `${indexPath}?tag=${encodeURIComponent(tag.toLowerCase())}`;

          return (
            <Link
              key={tag}
              aria-label={`${tagsLabel}: ${tag}`}
              href={href}
              style={{
                padding: '4px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '9999px',
                textDecoration: 'none',
                color: '#374151',
                fontSize: '14px'
              }}
            >
              <Label>{tag}</Label>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

interface ContentProps {
  document: CompiledMdxDocument<ArticleFrontmatter>;
  indexPath: string;
  socialShareUrl: string;
}

const Content: React.FC<ContentProps> = ({ document, indexPath, socialShareUrl }) => {
  return (
    <>
      <Stack padding='none'>
        {document.frontmatter.lede.length > 0 && (
          <Box marginBlockEnd={{ narrow: 24, wide: 48 }}>
            <header>
              <Lede>{document.frontmatter.lede}</Lede>
            </header>
          </Box>
        )}

        <Box
          borderBlockEndWidth='thin'
          borderColor='muted'
          borderStyle='solid'
          paddingBlockEnd={{ narrow: 40, wide: 64 }}
        >
          <Prose variant='editorial'>{document.content}</Prose>
        </Box>
      </Stack>

      {/* {people && people.length > 0 ? (
        <Box
          paddingBlockStart={40}
          paddingBlockEnd={40}
          borderBlockStartWidth='thin'
          borderBlockEndWidth='thin'
          borderColor='muted'
          borderStyle='solid'
        >
          <People label={peopleLabel || ''} people={people} />
        </Box>
      ) : null} */}

      <Box
        borderBlockEndWidth='thin'
        borderBlockStartWidth='thin'
        borderColor='muted'
        borderStyle='solid'
        paddingBlockEnd={40}
        paddingBlockStart={40}
      >
        <SocialShare url={socialShareUrl} />
      </Box>

      {document.frontmatter.tagsLabel && (document.frontmatter.tags.length ?? 0) > 0 ? (
        <Tags indexPath={indexPath} tags={document.frontmatter.tags} tagsLabel={document.frontmatter.tagsLabel} />
      ) : null}
    </>
  );
};

interface HeaderProps {
  document: CompiledMdxDocument<ArticleFrontmatter>;
  breadcrumbs?: Array<BreadcrumbItem>;
  // contentFormCta?: string;
}

const defaultBreadcrumbs: Array<BreadcrumbItem> = [] as const;

const Header: React.FC<HeaderProps> = ({ breadcrumbs = defaultBreadcrumbs }) => {
  // const {hero, featuredImage, publishedDate} = component.fields

  return (
    <header>
      {breadcrumbs.length > 0 ? (
        <Box marginBlockStart={20}>
          <BreadcrumbsList selectLastItem items={breadcrumbs} />
        </Box>
      ) : null}

      <Box
        borderBlockEndWidth='thin'
        borderColor='muted'
        borderStyle='solid'
        marginBlockStart={{ narrow: 48, regular: 64 }}
      >
        {/* {hero ? <ContentfulHero component={hero} heroClassName={styles.hero} paddingBlockEnd='none' data-hpc /> : null} */}

        {/* {publishedDate && <PublishedDate publishedDate={publishedDate} />} */}

        {/* {featuredImage ? (
          <Image
            className={styles.heroImage}
            as='picture'
            src={`${featuredImage.fields.file.url}?fm=webp`}
            sources={getImageSources(featuredImage.fields.file.url, { maxWidth: 1040 })}
            alt={featuredImage.fields.description || ''}
            borderRadius='medium'
            loading='lazy'
          />
        ) : null} */}

        {/* {contentFormCta ? (
          <Button
            className={styles.heroPrimaryButton}
            as='a'
            href='#content-form'
            variant='primary'
            trailingVisual={<ChevronDownIcon />}
            block
          >
            {contentFormCta}
          </Button>
        ) : null} */}
      </Box>
    </header>
  );
};

interface ArticleProps {
  article: CompiledMdxDocument<ArticleFrontmatter>;
}

const ArticleRoot: React.FC<ArticleProps> = ({ article }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  // const payload = toResourceDetailsPayload(useRoutePayload<unknown>());
  // const contentfulData = useContentfulData(payload.contentfulRawJsonResponse);
  // const page = toResourceDetailsPage(toEntryCollection(contentfulData).at(0));
  // const { template, settings } = page.fields;
  // const colorMode = settings?.fields.colorMode ?? 'light';

  // const { body, faq, featuredCta, featuredImage, form, hero, people, relatedResources, tableOfContents } =
  //   template.fields;

  // const locationUrl = new URL(page.fields.path, ssrSafeLocation.origin);
  // const queryParams = new URLSearchParams(ssrSafeLocation.search);
  // const featureFlags = queryParams.get('_features') || '';

  const currentVisibleHeading = useCurrentVisibleHeading({ ref: contentRef });
  // const breadcrumbListItems =
  //   payload.breadcrumbLinks?.map((link) => ({
  //     name: link.name,
  //     url: appendFeatureFlagsToUrl(link.href, featureFlags)
  //   })) || [];

  // const fallbackIndexPath = (() => {
  //   const segments = page.fields.path.split('/');
  //   segments.pop();
  //   return segments.join('/') || '/';
  // })();
  // const indexPath = payload.indexPath || fallbackIndexPath;

  // const contributors = people ? people.map((p: Person) => ({ name: p.fields.fullName })) : [];
  // const articleImageUrl = featuredImage?.fields.file.url ?? page.fields.seo?.fields.socialMediaImage?.fields.file.url;
  // const isArticlePage = page.fields.path.includes('resources/articles');
  // const isEventPage =
  //   template.fields.eventPageType === 'event' ||
  //   (!template.fields.eventPageType && page.fields.path.includes('resources/events'));

  const hasTableOfContents = article.headings.find((heading) => heading.level === 'h2') !== undefined;

  return (
    <>
      <Box marginBlockEnd={64}>
        <Grid className={styles.grid}>
          <Grid.Column span={12}>
            {/* <Header component={template} breadcrumbs={breadcrumbListItems} contentFormCta={form?.fields.submitText} /> */}
            <Header document={article} />
          </Grid.Column>

          <Grid.Column span={12}>
            <Grid>
              <Grid.Column span={{ xsmall: 12, large: 7 }}>
                <div ref={contentRef}>
                  <Content
                    document={article}
                    indexPath='/'
                    socialShareUrl=''
                    /* socialShareUrl={locationUrl.toString()} indexPath={indexPath} */
                  />
                </div>
              </Grid.Column>

              <Grid.Column className={styles.formWrapper} span={{ xsmall: 12, large: 4 }} start={{ large: 9 }}>
                {
                  hasTableOfContents /* && body */ ? (
                    <TableOfContents
                      active={currentVisibleHeading}
                      items={article.headings.filter((heading) => heading.level === 'h2')}
                    />
                  ) : null /* <Aside component={template} locationUrl={locationUrl} /> */
                }
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Box>

      {/* {relatedResources && relatedResources.length > 0 ? (
        <Box
          paddingBlockStart={{ narrow: 48, regular: 80 }}
          paddingBlockEnd={{ narrow: 64, regular: 96 }}
          backgroundColor='subtle'
        >
          <Grid>
            <Grid.Column>
              <RelatedResources relatedResources={relatedResources} />
            </Grid.Column>
          </Grid>
        </Box>
      ) : null} */}

      {/* {faq ? (
        <Box style={{ paddingTop: 'var(--base-size-96)', paddingBottom: 'var(--base-size-96)' }}>
          <ContentfulFaqGroup component={faq} headingLevel={'h2'} />
        </Box>
      ) : null} */}

      {/* {isEventPage ? (
        <ResourceEventSeoSchema
          fields={template.fields}
          title={page.fields.title ?? hero?.fields.heading ?? ''}
          description={hero?.fields.description}
          imageUrl={featuredImage?.fields.file?.url}
          contributors={contributors}
        />
      ) : isArticlePage ? (
        <ArticleSeoSchema
          title={page.fields.title ?? hero?.fields.heading ?? ''}
          imageUrl={articleImageUrl}
          contributors={contributors}
          dateModified={page.sys.updatedAt}
          datePublished={page.sys.createdAt}
        />
      ) : (
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Thing',
            'name': hero?.fields.heading,
            'description': hero?.fields.description
          })}
        </script>
      )} */}
    </>
  );
};

export const Article = Object.assign(ArticleRoot, {
  Root: ArticleRoot,
  Aside,
  Content,
  Tags,
  Header
});
