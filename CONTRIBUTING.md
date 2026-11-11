<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->
![Graphical Playground - Contribution Guidelines](https://github.com/GraphicalPlayground/.github/blob/main/assets/banners/gplayd-contributing.svg)

**Table of content**  
[Code of Conduct](#code-of-conduct)  
[Overview](#overview)  
[Getting Started](#getting-started)  
┕ [Prerequisites & Dependencies](#prerequisites--dependencies)  
┕ [Setting up the Development Environment](#setting-up-the-development-environment)  
[Development Workflow](#development-workflow)  
┕ [Branching Strategy](#branching-strategy)  
┕ [Commit Message Guidelines](#commit-message-guidelines)  
┕ [Pull Request Process](#pull-request-process)  
┕ [Code Review](#code-review)  
[Coding Standards](#coding-standards)  
[Community & Getting Help](#community--getting-help)  
<!-- markdownlint-enable MD013 -->

## Code of Conduct

We are committed to fostering a welcoming, respectful, and harassment-free environment for everyone,
regardless of experience level, background, or identity.

To ensure that the Graphical Playground community remains a safe space to learn, collaborate, and
build, we expect all maintainers, contributors, and community members to adhere to our community
standards.

Before participating in the `gp-platform` project, whether by opening an issue, submitting a pull
request, or joining our community channels, please read our full
[Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its
terms.

## Overview

Welcome to the `gp-platform` (Graphical Playground) contributor's guide!

First and foremost, thank you for your interest in contributing. Open-source projects thrive on the
diverse skills, perspectives, and time of their communities. Whether you are a rendering expert, a
technical writer, or a student looking for your first open-source contribution, we are thrilled to
have you here.

## Getting Started

_wip_...

### Prerequisites & Dependencies

_wip_...

### Setting up the Development Environment

_wip_...

## Development Workflow

_wip_...

### Branching Strategy

Our repository follows a structured branching model to ensure stability and smooth collaboration.

- `main`: This is the current stable production branch.
- `staging`: This is the current experimental branch where active integration happens.

**Release Branches:**

- `release-<version>`: We use specific branches for major releases (e.g., `release-1.0.0`),
  isolating them for final polishing and bug fixes.

**Working Branches:**

- **Personal Prefixes:** Everyone works on their own branches, which must be prefixed with the
  author's initials. For example:
  - `ms/...` (Mallory Scotton)
  - `om/...` (Ossan Msoili)
  - `ro/...` (Raphaël Ostier)
- **One Feature Per Branch:** Keep your work focused. Each branch should encompass a single feature
  or fix.
- **Automated Workflows:** Before a pull request can be merged, all CI/CD workflows (formatting,
  build, tags, etc.) must pass successfully.
- **Cleanup:** Once merged, working branches are deleted automatically.

### Commit Message Guidelines

We follow a structured convention for commit messages to ensure a clear and well-documented project
history.

**General Rules:**

- **Prefer using lower case** for the commit message subject.
- **Use a prefix** to indicate the type of commit (e.g., `add`, `update`, `chore`, `fix`, `hotfix`,
  `bug`, `docs`, etc.).
- **Sub-categories (Optional):** You can add a specific sub-category or scope in parentheses to
  provide more context. For example: `chore(format): ...`.
- **Be Explicit:** The commit message should explicitly state what the commit is actually
  implementing.
- **Small, Atomic Commits:** Prefer doing multiple focused commits instead of one giant one.
- **Co-authors:** If someone helps you with a commit or code, think about adding them as a
  co-author if it's relevant (e.g., `Co-authored-by: Name <email@example.com>` at the end of the
  commit message body).

**Classic Commit Guidelines:**

- Separate the subject line from the body with a blank line.
- Limit the subject line to 50-72 characters.
- Do not end the subject line with a period.
- Use the imperative mood in the subject line (e.g., `add core rendering module`, not `added` or
  `adds`).
- Wrap the body text at 72 characters.
- Use the body to explain _what_ you did and _why_, rather than _how_ you did it.

### Pull Request Process

_wip_...

### Code Review

Code review is a critical step in maintaining code quality, platform architecture integrity, and
performance across `gp-platform`. To ensure all contributions meet our standards, code reviews
follow strict review ownership and merge rules:

- **Review Eligibility & Ownership**: Code reviews must be performed by project maintainers or
  dedicated subsystem teams.
- **Automated Assignment via CODEOWNERS**: Reviewers are automatically assigned to pull requests
  based on the modified files and subsystems, as defined in our [`CODEOWNERS`](./.github/CODEOWNERS)
  file (e.g., changes to `/packages/realtime/` will automatically notify and request review
  from the Infrastructure team).
- **Merge Authority**: Only repository maintainers and administrators have permission to merge code
  into protected integration and release branches (`main`, `staging`, `release-*`).

> [!IMPORTANT]
> **Merge Requirements**  
> Before a pull request can be merged into `main` or `staging`, it must satisfy all of the following
> conditions:
>
> 1. Formally approved by all designated code owners assigned via the `CODEOWNERS` file.
> 2. Pass all automated CI/CD checks (formatting, compilation across supported platforms, and unit tests).
> 3. Resolve all open review discussions and inline thread feedback.

#### Github Teams

<!-- markdownlint-disable MD060 MD045 -->
|     | Team | Responsibilities |
| --- | ---  | ---------------- |
| ![](https://avatars.githubusercontent.com/t/18658494?s=116) | Security | Safeguards cloud execution environments, protects user data and proprietary engine assets, and manages platform access controls and vulnerability management. |
| ![](https://avatars.githubusercontent.com/t/16191532?s=116) | Platform Frontend | Builds and maintains the web-based learning platform, focusing on user experience, interactive tools, and real-time visual feedback. |
| ![](https://avatars.githubusercontent.com/t/18658484?s=116) | Platform Backend | Builds and maintains core web APIs, database architecture, user authentication, and backend microservices powering the platform. |
| ![](https://avatars.githubusercontent.com/t/18658506?s=116) | Design (Product/UX) | Crafts intuitive user interfaces, visual design systems, and seamless user workflows across the web learning platform. |
| ![](https://avatars.githubusercontent.com/t/18658514?s=116) | QA & Test Infrastructure | Develops automated testing pipelines, continuous integration workflows, and quality assurance suites across platform and engine releases. |
| ![](https://avatars.githubusercontent.com/t/18658503?s=116) | Legal & Compliance | Oversees terms of service, IP licensing agreements, NDA enforcement, platform partner compliance, and regulatory standards. |
| ![](https://avatars.githubusercontent.com/t/16191538?s=116) | Infrastructure & DevOps | Manages cloud infrastructure, remote GPU execution, deployment pipelines, and system scalability for the platform. |
| ![](https://avatars.githubusercontent.com/t/16191540?s=116) | Documentation & Knowledge | Maintains technical documentation, contributor guidelines, and educational references across the Graphical Playground ecosystem. |
| ![](https://avatars.githubusercontent.com/t/18658516?s=116) | Data & Analytics | Tracks, models, and analyzes user learning behaviors, platform performance telemetry, and key growth metrics to guide product decisions. |
| ![](https://avatars.githubusercontent.com/t/16191539?s=116) | Curriculum & Learning Design | Defines learning paths, educational structure, and progression across courses, sample projects, and certification programs. |
| ![](https://avatars.githubusercontent.com/t/18658540?s=116) | Community & DevRel | Fosters developer engagement, manages community forums and events, and advocates for user and contributor needs across the platform ecosystem. |
| ![](https://avatars.githubusercontent.com/t/18658527?s=116) | Billing & Growth | Manages payment processing, subscription systems, pricing tiers, and user acquisition strategies to drive platform adoption and expansion. |
<!-- markdownlint-enable MD060 MD045 -->

## Coding Standards

_wip_...

## Community & Getting Help

Getting stuck is a normal part of working on a complex repository! Whether you need help configuring
the projects or tools, want feedback on a new shader you're writing, or just want to show off a project
you built with `gp-platform`, we are here to support you.

**Where to Connect:**

- **Discord**: [Join our Discord Server][discord] for real-time chat with the maintainers and other
  developers. This is the best place for quick questions and informal technical discussions.
- **GitHub Discussions**: For longer-form questions, architectural proposals, or sharing your
  showcases, head over to [GitHub Discussions](https://github.com/orgs/GraphicalPlayground/discussions).
- **Social Media**: Follow our updates and community highlights on [LinkedIn](https://www.linkedin.com/company/graphical-playground).

**Reporting Security Vulnerabilities:**

If you discover a security vulnerability within `gp-platform`, please do not report it by opening a
public GitHub issue. We take security seriously. Instead, refer to our [Security Policy](./SECURITY.md)
and email us directly at <security@graphical-playground.com> so we can address it safely.

**General Inquiries:**

For non-technical support, business inquiries, or general questions, you can reach the core team via
email:

- <support@graphical-playground.com>
- <contact@graphical-playground.com>

**Supporting the Project:**

Maintaining a modern educational platform and creating high-quality educational resources takes a
massive amount of time and effort. If you find `gp-platform` valuable for your learning, research, or
development journey, please consider supporting the project!

You can sponsor the Graphical Playground project through the following links:

- [**Buy Me A Coffee**](https://www.buymeacoffee.com/GraphicalPlayground)
- [**GitHub Sponsors**](https://github.com/sponsors/GraphicalPlayground)
- [**Open Collective**](https://opencollective.com/graphical-playground)
- [**Thanks Dev**](https://thanks.dev/u/gh/GraphicalPlayground)
- [**Direct donation**](https://graphical-playground.com/donate)

---

_Thank you for being a part of the Graphical Playground. We can't wait to see what you build!_

---
© 2026 Graphical Playground. Built for the next generation of graphics engineers.

![Graphical Playground](https://github.com/GraphicalPlayground/.github/blob/main/assets/misc/gplayd-footer.svg)

[discord]: https://discord.graphical-playground.com
