// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Article } from '@gp/content';
import { Organization } from '@gp/constants';
import {
  JsonLdIds,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
  organization,
  website
} from './jsonld';
import { SeoMetadata } from './metadata';
import { Constants } from './utils';

const seo = SeoMetadata.for('marketing', { baseUrl: Organization.url });

describe('@gp/seo metadata and JSON-LD', () => {
  it('uses Organization.displayName everywhere instead of Function.name', () => {
    const base = seo.base();
    const orgRecord = organization as unknown as Record<string, unknown>;
    const siteRecord = website as unknown as Record<string, unknown>;

    assert.equal(Constants.name, 'Graphical Playground');
    assert.equal(orgRecord['name'], 'Graphical Playground');
    assert.equal(siteRecord['name'], 'Graphical Playground');
    assert.equal(base.applicationName, 'Graphical Playground');
    assert.deepEqual(base.title, {
      default: 'Graphical Playground',
      template: '%s | Graphical Playground'
    });
    assert.equal(base.openGraph?.siteName, 'Graphical Playground');
    assert.equal(base.twitter?.title, 'Graphical Playground');
  });

  it('points organization logo to an existing asset and uses schema.org address', () => {
    const orgRecord = organization as unknown as Record<string, unknown>;

    assert.deepEqual(orgRecord['address'], { '@id': JsonLdIds.localization });
    assert.equal((orgRecord['logo'] as { url?: string }).url, `${Organization.url}/favicon.svg`);
  });

  it('omits robots and keywords when unset and falls back to /opengraph-image on child routes', () => {
    const rootMeta = seo.page({
      path: '/',
      title: 'Graphical Playground',
      description: 'Home.'
    });
    const childMeta = seo.page({
      path: '/about',
      title: 'About Us',
      description: 'About Graphical Playground.'
    });

    assert.equal(Object.hasOwn(childMeta, 'robots'), false);
    assert.equal(Object.hasOwn(childMeta, 'keywords'), false);
    assert.equal(Object.hasOwn(rootMeta.openGraph ?? {}, 'images'), false);
    assert.equal(Object.hasOwn(rootMeta.twitter ?? {}, 'images'), false);
    assert.deepEqual(childMeta.openGraph?.images, [
      {
        url: `${Organization.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'About Us'
      }
    ]);
    assert.deepEqual(childMeta.twitter?.images, [`${Organization.url}/opengraph-image`]);
    assert.equal((childMeta.twitter as { card?: string } | undefined)?.card, 'summary_large_image');
  });

  it('supports noindex with follow=true for filtered search index routes', () => {
    const meta = seo.page({
      path: '/glossary',
      title: 'Glossary',
      description: 'Graphics glossary.',
      noindex: true,
      follow: true
    });

    assert.deepEqual(meta.robots, {
      index: false,
      follow: true,
      googleBot: {
        'index': false,
        'follow': true,
        'noimageindex': true,
        'max-snippet': 0,
        'max-image-preview': 'none',
        'noarchive': true
      }
    });
  });

  it('falls back to lede when article description is TODO, resolves author slugs, and omits empty images', () => {
    const breakdown: Article = {
      type: 'breakdown',
      title: '4A Engine',
      slug: 'engines/4a-engine',
      lede: 'Built in Kyiv, the 4A Engine powers the Metro series.',
      description: 'TODO',
      subject: '4A Engine',
      synonims: ['Metro Engine'],
      prerequisites: [],
      sources: [],
      category: 'engine-architecture',
      tags: ['game-engine'],
      difficulty: 'intermediate',
      author: 'mallory-scotton',
      datePublished: new Date('2026-08-27T00:00:00Z'),
      locale: 'en',
      draft: false,
      noindex: false,
      relatedSlugs: []
    };

    const meta = seo.article(breakdown, '/breakdowns/engines/4a-engine');
    const jsonLd = buildArticleJsonLd(breakdown, '/breakdowns/engines/4a-engine');
    const articleNode = jsonLd['@graph'].find((node) => (node as { '@type'?: string })['@type'] === 'TechArticle') as
      Record<string, unknown> | undefined;

    assert.equal(meta.description, breakdown.lede);
    assert.deepEqual(meta.authors, [{ name: 'Mallory Scotton' }]);
    assert.deepEqual(meta.openGraph?.images, [
      {
        url: `${Organization.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: '4A Engine'
      }
    ]);
    assert.ok(articleNode);
    assert.equal(articleNode['description'], breakdown.lede);
    assert.equal((articleNode['author'] as Array<{ name?: string }>)[0]?.name, 'Mallory Scotton');
    assert.equal(articleNode['image'], `${Organization.url}/opengraph-image`);
  });

  it('emits DefinedTerm and DefinedTermSet nodes for glossary articles', () => {
    const glossary: Article = {
      type: 'glossary',
      title: 'Keyframe',
      slug: 'keyframe',
      lede: 'Almost every animation starts as keyframes.',
      description: 'How keyframes anchor animation curves.',
      term: 'Keyframe',
      shortDefinition: 'A stored value of an animated property at a point in time.',
      synonims: ['Key Pose'],
      relatedTerms: ['Interpolation'],
      category: 'uncategorized',
      tags: ['animation'],
      difficulty: 'beginner',
      author: 'mallory-scotton',
      datePublished: new Date('2026-07-29T00:00:00Z'),
      locale: 'en',
      draft: false,
      noindex: false,
      relatedSlugs: []
    };

    const graph = buildArticleJsonLd(glossary, '/glossary/keyframe');
    const termNode = graph['@graph'].find((node) => (node as { '@type'?: string })['@type'] === 'DefinedTerm') as
      Record<string, unknown> | undefined;

    assert.ok(termNode);
    assert.equal(termNode['name'], 'Keyframe');
    assert.equal(termNode['description'], glossary.shortDefinition);
    assert.deepEqual(termNode['alternateName'], ['Key Pose']);
  });

  it('links WebPage, BreadcrumbList, CollectionPage, and FAQPage nodes into the global graph', () => {
    const aboutPage = buildWebPageJsonLd({
      type: 'AboutPage',
      path: '/about',
      name: 'About Us',
      description: 'About Graphical Playground.',
      hasBreadcrumb: true
    });
    const breadcrumb = buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' }
    ]);
    const collection = buildCollectionPageJsonLd({
      name: 'Glossary',
      description: 'Graphics terms.',
      path: '/glossary',
      items: [{ name: 'Keyframe', path: '/glossary/keyframe' }]
    });
    const faq = buildFaqJsonLd([{ question: 'What is GP?', answer: 'An open-source graphics platform.' }], {
      path: '/faq',
      name: 'FAQ',
      description: 'Answers about GP.'
    });

    assert.equal(aboutPage['@type'], 'AboutPage');
    assert.deepEqual(aboutPage.breadcrumb, { '@id': JsonLdIds.breadcrumb('/about') });
    assert.equal(breadcrumb['@id'], JsonLdIds.breadcrumb('/about'));
    assert.deepEqual(collection.isPartOf, { '@id': JsonLdIds.website });
    assert.deepEqual(collection.publisher, { '@id': JsonLdIds.organization });
    assert.equal(faq['@id'], JsonLdIds.faq('/faq'));
    assert.deepEqual(faq.isPartOf, { '@id': JsonLdIds.website });
  });
});
