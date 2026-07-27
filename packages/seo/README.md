# [@gp](https://github.com/GraphicalPlayground)/seo

SEO/GEO toolkit shared by `apps/marketing`, `apps/app`, and `apps/admin`. Only `marketing` is meant to be publicly
indexed. `app` and `admin` are authenticated product surfaces, so they get noindex-everywhere defaults throughout.

## Module map

| Import | Contents |
| --- | --- |
| `@gp/seo` | Everything below except `./react` and `./jsonld` (kept subpath-only). |
| `@gp/seo/metadata` | `SeoMetadata` — Next.js Metadata API builder (`base`/`page`/`article`/`legal`). |
| `@gp/seo/metadata/opengraph-image` | `renderOgImage` — shared branded `next/og` template for `opengraph-image.tsx` route files. |
| `@gp/seo/robots` | `SeoRobots` — robots.txt rules, per-page `<meta name="robots">`, and the `X-Robots-Tag` middleware header. |
| `@gp/seo/sitemap` | `SeoSitemap` — `sitemap.xml` entries, always empty for non-indexable targets. |
| `@gp/seo/llms` | `SeoLlms` — `/llms.txt` generation (GEO: what AI agents/answer engines read instead of crawling). |
| `@gp/seo/jsonld` | Static entity graph (organization/people/website/...) plus `buildArticleJsonLd`/`buildBreadcrumbJsonLd`/`buildFaqJsonLd`/`buildCourseJsonLd`/`buildCollectionPageJsonLd`. |
| `@gp/seo/react` | `<JsonLd>`, `<BreadcrumbJsonLd>`, `<FaqJsonLd>`, `<CourseJsonLd>`, `<CollectionJsonLd>` components. |
| `@gp/seo/utils` | `Urls`, `Constants`, `AppTarget`, `isPubliclyIndexable`. |

## Usage

**Root layout** (`apps/*/src/app/layout.tsx`):

```tsx
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).base();
```

**A page** (`generateMetadata` or `export const metadata`):

```tsx
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/about',
  title: 'About',
  description: 'Who builds Graphical Playground and why.'
});
```

**A content page backed by `@gp/content`**:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await cms.legal.getBySlug(slug);
  if (!doc) return {};
  return SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).legal(doc.frontmatter, `/legal/${slug}`);
}
```

`robots.ts` / `sitemap.ts` follow the same `X.for(target, ...)` factory pattern — see any app's `src/app/robots.ts`.

## Breadcrumb/FAQ JSON-LD: co-locate, don't centralize

`buildBreadcrumbJsonLd`/`buildFaqJsonLd` (and their `<BreadcrumbJsonLd>`/`<FaqJsonLd>` component wrappers) are
**not** part of `SeoMetadata.page()`/`.article()`. Structured data generated independently from what a page actually
renders can drift from it, and Google penalizes FAQPage/BreadcrumbList markup that doesn't match the visible content.
Instead:

```tsx
// Inside the real, visual Breadcrumb/FAQ component, using the exact same `items` prop:
<nav aria-label='Breadcrumb'>{/* ...renders items visually... */}</nav>
<BreadcrumbJsonLd items={items} />
```

Render the JSON-LD component next to the visual one, sourced from the same data. That's the only way to guarantee
the two stay in sync.

The same rule applies to `<CourseJsonLd>`/`<CollectionJsonLd>`: never pass an `offer`, `rating`, or `items` array
that isn't the exact data rendered on the page, a price or rating mismatch between structured data and visible
content is a Google Search Console penalty risk, not just a style nit.
