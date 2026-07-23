# Articles

SEO/GEO content for the marketing platform. Every `.mdx` file's frontmatter
must validate against `articleFrontmatterUnionSchema` from `@gp/content`.

| Folder             | Type            | Schema                           |
| ------------------ | --------------- | -------------------------------- |
| `guides/`          | `guide`         | `guideFrontmatterSchema`         |
| `comparisons/`     | `comparison`    | `comparisonFrontmatterSchema`    |
| `tech-articles/`   | `tech-article`  | `techArticleFrontmatterSchema`   |
| `glossary/`        | `glossary`      | `glossaryFrontmatterSchema`      |
| `breakdowns/`      | `breakdown`     | `breakdownFrontmatterSchema`     |
| `interviews/`      | `interview`     | `interviewFrontmatterSchema`     |
| `changelogs/`      | `changelog`     | `changelogFrontmatterSchema`     |
| `roadmaps/`        | `roadmap`       | `roadmapFrontmatterSchema`       |
| `showcases/`       | `showcase`      | `showcaseFrontmatterSchema`      |
| `research/`        | `research`      | `researchFrontmatterSchema`      |

All ten extend the shared `articleFrontmatterSchema` (title, slug,
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
- **Changelogs** are public release notes. Adds an optional semver `version`
  and a required `changeTypes` list (`feature` / `improvement` / `fix` /
  `deprecation` / `breaking`).
- **Roadmaps** are forward-looking plans. Adds `status` (`planned` /
  `in-progress` / `shipped`), an optional `targetQuarter` (e.g. `2026-Q3`),
  and an optional `relatedChangelogSlug` to link forward once shipped.
- **Showcases** spotlight a learner's project, distinct from the writeup's
  `author` via a dedicated `creator`. Adds `projectUrl`, `repositoryUrl`,
  `technologies`, and an optional `certificateSlug` tying the showcase back
  to the certificate track that produced it.
- **Research** covers rigorous, data-backed writeups. Adds an `abstract`,
  optional `contributors` (beyond the single `author`), `references`,
  and optional `methodology`/`datasetUrl` fields.
