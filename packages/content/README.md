# [@gp](https://github.com/GraphicalPlayground)/content

This package only holds the zod schemas (`src/`). The actual `.mdx` content
lives at the repo root in [`content/`](../../content), organized to mirror
these schemas.

## Content types

- **Legal** ([`content/legal/`](../../content/legal)) — `legalFrontmatterSchema`, extended by `subprocessorsFrontmatterSchema`.
- **Articles** ([`content/articles/`](../../content/articles)) — SEO/GEO content, validated by `articleFrontmatterUnionSchema`:
  - `guides/` — `guideFrontmatterSchema` (`type: 'guide'`)
  - `comparisons/` — `comparisonFrontmatterSchema` (`type: 'comparison'`)
  - `tech-articles/` — `techArticleFrontmatterSchema` (`type: 'tech-article'`)
  - `glossary/` — `glossaryFrontmatterSchema` (`type: 'glossary'`)
  - `breakdowns/` — `breakdownFrontmatterSchema` (`type: 'breakdown'`)
  - `interviews/` — `interviewFrontmatterSchema` (`type: 'interview'`)
  - `changelogs/` — `changelogFrontmatterSchema` (`type: 'changelog'`)
  - `roadmaps/` — `roadmapFrontmatterSchema` (`type: 'roadmap'`)
  - `showcases/` — `showcaseFrontmatterSchema` (`type: 'showcase'`)
  - `research/` — `researchFrontmatterSchema` (`type: 'research'`)
