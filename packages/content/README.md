# [@gp](https://github.com/GraphicalPlayground)/content

## Content types

- **Legal** (`legal/`) — `legalFrontmatterSchema`, extended by `subprocessorsFrontmatterSchema`.
- **Articles** (`articles/`) — SEO/GEO content, validated by `articleFrontmatterUnionSchema`:
  - `guides/` — `guideFrontmatterSchema` (`type: 'guide'`)
  - `comparisons/` — `comparisonFrontmatterSchema` (`type: 'comparison'`)
  - `tech-articles/` — `techArticleFrontmatterSchema` (`type: 'tech-article'`)
  - `glossary/` — `glossaryFrontmatterSchema` (`type: 'glossary'`)
