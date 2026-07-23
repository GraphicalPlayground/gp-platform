# Articles

SEO/GEO content for the marketing platform. Every `.mdx` file's frontmatter
must validate against `articleFrontmatterUnionSchema` from `@gp/content`.

| Folder             | Type            | Schema                          |
| ------------------ | --------------- | -------------------------------- |
| `guides/`          | `guide`         | `guideFrontmatterSchema`         |
| `comparisons/`     | `comparison`    | `comparisonFrontmatterSchema`    |
| `tech-articles/`   | `tech-article`  | `techArticleFrontmatterSchema`   |
| `glossary/`        | `glossary`      | `glossaryFrontmatterSchema`      |
| `breakdowns/`      | `breakdown`     | `breakdownFrontmatterSchema`     |
| `interviews/`      | `interview`     | `interviewFrontmatterSchema`     |

All six extend the shared `articleFrontmatterSchema` (title, slug,
description, category, tags, difficulty, author, dates, cover image,
optional `faq` for `FAQPage` JSON-LD, optional `seo` title/description
override).

- **Breakdowns** dissect a specific technology or system end-to-end (e.g.
  "How Nanite Works", "Godot's Rendering Pipeline"). Adds `subject`,
  `prerequisites`, and an optional `sources` list of the talks/papers/blog
  posts the breakdown is grounded in — useful both for credibility and for
  readers who want to go to the primary source.
- **Interviews** feature a named `interviewee` (name, title, company, socials)
  distinct from the piece's `author`. Adds `format` (`text` / `video` /
  `podcast`) and an optional `highlightQuote` for pull-quotes and OG/social
  cards.
