// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { MetadataRoute, Metadata } from 'next';

/**
 * @brief Type for the app target, used to determine which robots.txt rules to apply.
 */
export type AppTarget = 'admin' | 'app' | 'marketing';

/**
 * @brief Type for the robots.txt rules, as defined in Next.js MetadataRoute.Robots
 */
export type RobotsRule = MetadataRoute.Robots['rules'];

/**
 * @brief Options for generating robots.txt and related SEO metadata.
 */
export interface SeoRobotsOptions {
  /**
   * @brief Canonical base URL of the app.
   * @example https://app.graphical-playground.com
   */
  baseUrl: string;

  /**
   * @brief Path to the sitemap, defaults to /sitemap.xml (marketing only).
   * @default /sitemap.xml
   */
  sitemapPath?: string;

  /**
   * @brief Extra rules appended after the target's defaults (e.g. per-env tweaks).
   */
  additionalRules?: RobotsRule[];

  /**
   * @brief Paths to explicitly allow, only meaningful for target "app".
   */
  publicPaths?: string[];

  /**
   * @brief Paths to explicitly block, only meaningful for target "app".
   */
  privatePaths?: string[];

  /**
   * @brief Opt out of the AI/GEO crawler allow-list on marketing.
   * @default false
   */
  disableAiCrawlers?: boolean;
}

/**
 * @brief Named AI/LLM crawlers relevant for GEO (Generative Engine Optimization).
 * @details  Kept as a single source of truth so new bots can be added in one place and picked up by every marketing surface.
 */
export const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'GoogleOther',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Bytespider',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'Diffbot'
] as const;

/**
 * @brief Class for generating SEO robots.txt rules and related metadata for different app targets.
 */
export class SeoRobots {
  /**
   * @brief Private constructor to enforce the use of the factory method for creating SeoRobots instances.
   * @param target - The app target (admin, app, or marketing) for which to generate robots.txt rules.
   * @param options - The options for generating robots.txt and related SEO metadata.
   */
  private constructor(
    private readonly target: AppTarget,
    private readonly options: SeoRobotsOptions
  ) {}

  /**
   * @brief Factory method to create a SeoRobots instance for a specific target and options.
   * @param target - The app target (admin, app, or marketing) for which to generate robots.txt rules.
   * @param options - The options for generating robots.txt and related SEO metadata.
   * @returns A new instance of SeoRobots configured for the specified target and options.
   */
  static for(target: AppTarget, options: SeoRobotsOptions): SeoRobots {
    return new SeoRobots(target, options);
  }

  /**
   * @brief Converts the SeoRobots instance into a MetadataRoute.Robots object for use in Next.js.
   * @returns A MetadataRoute.Robots object containing the appropriate rules and sitemap/host information based on the target and options.
   */
  toMetadataRoute(): MetadataRoute.Robots {
    const rules = this.buildRules();
    const route: MetadataRoute.Robots = { rules: rules as any };

    if (this.target === 'marketing') {
      const sitemapPath = this.options.sitemapPath ?? '/sitemap.xml';
      route.sitemap = `${this.trimBaseUrl()}${sitemapPath}`;
      route.host = this.trimBaseUrl();
    }

    return route;
  }

  /**
   * @brief Trims trailing slashes from the base URL to ensure proper formatting for sitemap and host.
   * @returns The base URL without trailing slashes.
   */
  private trimBaseUrl(): string {
    return this.options.baseUrl.replace(/\/+$/, '');
  }

  /**
   * @brief Builds the robots.txt rules based on the target and options.
   * @returns An array of RobotsRule objects representing the rules for the target.
   */
  private buildRules(): RobotsRule[] {
    const extra = this.options.additionalRules ?? [];

    switch (this.target) {
      case 'admin':
        // No exceptions. Admin is never indexed, by anyone.
        return [{ userAgent: '*', disallow: '/' }, ...extra];

      case 'app':
        // No exceptions. The app is a private product surface, never indexed.
        return [{ userAgent: '*', disallow: '/' }, ...extra];

      case 'marketing': {
        const rules: RobotsRule[] = [{ userAgent: '*', allow: '/' }];
        if (!this.options.disableAiCrawlers) {
          AI_CRAWLERS.forEach((bot) => rules.push({ userAgent: bot, allow: '/' }));
        }
        return [...rules, ...extra];
      }
    }
  }

  /**
   * @brief Per-page override for the App Router Metadata API.
   * @param indexable - Whether the page should be indexed by search engines.
   * @param [opts] - Optional parameters for follow, noArchive, and maxSnippet.
   * @returns A Metadata['robots'] object with the appropriate settings for the page.
   */
  static pageRobots(
    indexable: boolean,
    opts: { follow?: boolean; noArchive?: boolean; maxSnippet?: number } = {}
  ): Metadata['robots'] {
    const { follow = indexable, noArchive = !indexable, maxSnippet } = opts;

    return {
      index: indexable,
      follow,
      googleBot: {
        'index': indexable,
        follow,
        'noimageindex': !indexable,
        'max-snippet': maxSnippet ?? (indexable ? -1 : 0),
        'max-image-preview': indexable ? 'large' : 'none',
        'noarchive': noArchive
      }
    };
  }

  /**
   * @brief Header pair for middleware, as a defense-in-depth layer on top of robots.ts.
   * @details protects against crawlers that ignore robots.txt, and covers any response path that bypasses metadata.
   * @returns A record of headers to be sent with the response, instructing crawlers not to index or follow the page.
   */
  static noIndexHeaders(): Record<string, string> {
    return { 'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet' };
  }
}
