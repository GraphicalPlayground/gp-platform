---
id: ADR-0001
title: >- 
  Course Content Storage
date: 2026-11-27
status: proposed
authors:
  - ossan-msoili
deciders:
  - mallory-scotton
  - ossan-msoili
  - raphael-ostier
---

<!-- markdownlint-disable MD025 -->
# ADR-0001: Course Content Storage

> *Choose a storage approach that supports authoring and evolving courses while  accommodating their structure, publication, and future platform features.*

![Proposed][badge-proposed]
<!-- proposed | accepted | rejected | deprecated | superseded -->

## Context

The platform plans to provide a curriculum made up of courses, modules, and lessons, with learning objectives and dependencies between modules. In the future, courses may be connected to features such as exercises and learner progress tracking.

The repository already contains file-based MDX articles, while the Curriculum page is still under construction. The backend and database package do not yet define course storage. This decision establishes a source of truth before these features are added.

The main constraints are:

- Make long lessons easy to write and read.
- Keep courses, modules, lessons, ordering, and publication status in a queryable structure.
- Allow courses to be edited and published without redeploying the application in the future.
- Avoid treating a complete JSON document as a substitute for a relational data model.
- Store media separately from lesson text.

## Decision

Use PostgreSQL as the source of truth for course content and structure.

- Model courses, modules, lessons, ordering, and publication statuses using appropriate fields and relations in PostgreSQL.
- Store each lesson's authored body as Markdown in a text (`TEXT`) column.
- Store inherently structured and variable content, such as quiz questions, in JSONB where appropriate, and validate it with an application-level schema.
- Expose course resources as JSON through the API without requiring their source content to be authored or persisted as a complete JSON document.
- Use Azure Blob Storage for images and other media files; keep their references in PostgreSQL.
- Use Redis only as an optional cache. PostgreSQL remains the source of truth.
- Render Markdown with a safely configured renderer; do not execute arbitrary user-provided MDX.

## Alternatives Considered

### Option A: Markdown/MDX Files Versioned in Git

Store lessons in `.md` or `.mdx` files in the repository and load content from the file system. Metadata and relationships could be indexed separately.

**Why rejected:** This option fits the existing article workflow and provides a readable Git history. However, editing courses through an admin interface would require synchronization or deployment. It would also introduce a risk of divergence between files and course data in the database.

### Option B: Complete Courses Stored as JSON Documents

Store each course, including lesson text, in a JSON document.

**Why rejected:** JSON is suitable for structured data and API exchanges, but is less pleasant to author and review for long lessons. A document containing an entire course also makes relationships and targeted updates less natural than a relational model.

## Consequences

### Positive

- Lesson text remains readable and easy to edit with common authoring tools.
- Course structure can be queried and filtered directly in PostgreSQL.
- A future admin interface can save and publish changes without deploying the application.
- The model can evolve to support exercises and learner progress without making files or a complete JSON document the source of truth.
- Media can scale independently from authored content storage.

### Negative

- Course data models, migrations, and management APIs will need to be developed.
- The backend will need to validate content and render Markdown safely.
- Editorial history and a rollback mechanism will need to be provided if the publication workflow requires them.
- Course content will be included in database backups and maintenance operations.
- Course editors will not automatically get Git pull requests for reviewing each content change.

## Rationale and Cross-References

- The repository already uses MDX files for articles, but they serve a static editorial workflow that differs from the intended course lifecycle.
- This ADR covers course storage; detailed modeling of learner progress and exercises is out of scope.

**Canonical references:**

- CommonMark project, *CommonMark 0.31.2 Specification*
  (<https://spec.commonmark.org/0.31.2/>): defines Markdown as a plain-text format for writing
  structured documents.
- IETF, *RFC 8259: The JSON Data Interchange Format*
  (<https://www.rfc-editor.org/rfc/rfc8259.html>): specifies JSON as a text-based format for
  representing structured data; JSON strings require escaping quotation marks, backslashes, and
  control characters.
- PostgreSQL Global Development Group, *PostgreSQL JSON Types*
  (<https://www.postgresql.org/docs/current/datatype-json.html>, Sections 8.14.2 and 8.14.4):
  documents JSON and JSONB storage, operators, and GIN indexing capabilities.
- PostgreSQL Global Development Group, *PostgreSQL Character Types*
  (<https://www.postgresql.org/docs/current/datatype-character.html>): documents `text` as a
  variable-length character type for storing lesson bodies as text.
- PostgreSQL Global Development Group, *TOAST: The Oversized-Attribute Storage Technique*
  (<https://www.postgresql.org/docs/current/storage-toast.html>): describes PostgreSQL's handling
  of large field values.
- MDX project, *Frontmatter Guide* (<https://mdxjs.com/guides/frontmatter/>): explains that
  frontmatter is not built into MDX by default and describes ways to support it.
- Zod project, *Zod Documentation* (<https://zod.dev/>): documents TypeScript-first runtime schema
  validation and static type inference.
- GraphicalPlayground, *gp-platform Content Package*
  (`packages/content/src/cms/repositories/articles-repository.ts` and
  `packages/content/src/article/guide.ts`): existing examples of filesystem-based MDX management
  and Zod-validated article metadata.
- Redis, *How to Use Redis for Query Caching*
  (<https://redis.io/tutorials/howtos/solutions/microservices/caching/>): describes cache-aside
  query caching, loading from the primary database on a cache miss, and cache expiration.
- Microsoft, *Azure Architecture Center: Cache-Aside Pattern*
  (<https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside>): describes
  on-demand caching and the need to manage staleness relative to the underlying data store.
- GraphicalPlayground, *gp-platform Curriculum Page*
  (`apps/marketing/src/app/(resources)/curriculum/page.tsx`): records the current state of the
  Curriculum page.

<!-- markdownlint-disable MD053 -->
[badge-proposed]: https://img.shields.io/badge/Status-Proposed-yellow.svg