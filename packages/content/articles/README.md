# Articles

SEO/GEO content for the marketing platform. Every `.mdx` file's frontmatter
must validate against `articleFrontmatterUnionSchema` from `@gp/content`.

| Folder             | Type            | Schema                          |
| ------------------ | --------------- | -------------------------------- |
| `guides/`          | `guide`         | `guideFrontmatterSchema`         |
| `comparisons/`     | `comparison`    | `comparisonFrontmatterSchema`    |
| `tech-articles/`   | `tech-article`  | `techArticleFrontmatterSchema`   |
| `glossary/`        | `glossary`      | `glossaryFrontmatterSchema`      |

All four extend the shared `articleFrontmatterSchema` (title, slug,
description, category, tags, difficulty, author, dates, cover image,
optional `faq` for `FAQPage` JSON-LD, optional `seo` title/description
override).
