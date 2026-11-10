// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Article, MdxDocument } from '@gp/content';

export interface SearchField {
  weight: number;
  normalized: string;
  compact: string;
  words: string[];
}

export interface SearchDocument {
  fields: SearchField[];
}

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const splitWords = (normalized: string): string[] => normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);

const humanize = (slug: string): string => slug.replace(/-/g, ' ');

const buildField = (values: string[], weight: number): SearchField | null => {
  const joined = values.filter(Boolean).join(' ').trim();

  if (!joined) return null;

  const normalized = normalizeText(joined);
  const words = splitWords(normalized);

  return {
    weight,
    normalized,
    compact: words.join(''),
    words
  };
};

const getPrimaryValues = (frontmatter: Article): string[] => {
  switch (frontmatter.type) {
    case 'glossary':
      return [frontmatter.title, frontmatter.term];
    case 'breakdown':
      return [frontmatter.title, frontmatter.subject];
    case 'comparison':
      return [frontmatter.title, ...frontmatter.subjects.map((subject) => subject.name)];
    default:
      return [frontmatter.title];
  }
};

const getSecondaryValues = (frontmatter: Article): string[] => {
  const base = [frontmatter.category, humanize(frontmatter.category), ...frontmatter.tags];

  switch (frontmatter.type) {
    case 'glossary':
      return [...base, ...frontmatter.synonims, ...frontmatter.relatedTerms];
    case 'breakdown':
      return [...base, ...frontmatter.synonims];
    case 'guide':
      return [...base, ...frontmatter.toolsRequired];
    case 'interview':
      return [
        ...base,
        frontmatter.interviewee.name,
        frontmatter.interviewee.title,
        frontmatter.interviewee.company ?? ''
      ];
    case 'showcase':
      return [...base, frontmatter.creator.name, ...frontmatter.technologies];
    default:
      return base;
  }
};

const getSummaryValues = (doc: MdxDocument<Article>, resolvedDescription: string): string[] => {
  const { frontmatter } = doc;
  const base = [resolvedDescription, frontmatter.lede];

  switch (frontmatter.type) {
    case 'glossary':
      return [...base, frontmatter.shortDefinition];
    case 'comparison':
      return [...base, ...frontmatter.subjects.map((subject) => subject.description)];
    case 'research':
      return [...base, frontmatter.abstract];
    default:
      return base;
  }
};

/**
 * @brief Indexes an article's metadata into weighted fields for exact, prefix, and typo-tolerant matching.
 */
export const buildSearchDocument = (doc: MdxDocument<Article>, resolvedDescription: string): SearchDocument => {
  const fields = [
    buildField(getPrimaryValues(doc.frontmatter), 4),
    buildField(getSecondaryValues(doc.frontmatter), 2.5),
    buildField(getSummaryValues(doc, resolvedDescription), 1)
  ].filter((field): field is SearchField => field !== null);

  return { fields };
};

/**
 * @brief Restricted Damerau-Levenshtein (Optimal String Alignment) distance with early exit past `maxEdits`.
 * @details Treats insertions, deletions, substitutions, and adjacent character transpositions as 1 edit.
 */
const osaDistance = (source: string, target: string, maxEdits: number): number => {
  const m = source.length;
  const n = target.length;

  if (Math.abs(m - n) > maxEdits) return maxEdits + 1;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;

  for (let i = 1; i <= m; i++) {
    let rowMin = Number.POSITIVE_INFINITY;

    for (let j = 1; j <= n; j++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      let val = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost);

      if (i > 1 && j > 1 && source[i - 1] === target[j - 2] && source[i - 2] === target[j - 1]) {
        val = Math.min(val, dp[i - 2]![j - 2]! + 1);
      }

      dp[i]![j] = val;
      if (val < rowMin) rowMin = val;
    }

    if (rowMin > maxEdits) return maxEdits + 1;
  }

  return dp[m]![n]!;
};

const maxAllowedEdits = (tokenLength: number): number => {
  if (tokenLength >= 7) return 2;
  if (tokenLength >= 4) return 1;

  return 0;
};

const scoreTokenAgainstField = (token: string, field: SearchField): number => {
  let best = 0;

  for (const word of field.words) {
    if (word === token) return field.weight * 10;
    if (word.startsWith(token)) best = Math.max(best, field.weight * 7);
  }

  if ((token.length >= 3 && field.normalized.includes(token)) || (token.length >= 4 && field.compact.includes(token))) {
    best = Math.max(best, field.weight * 5);
  }

  // If we already found a strong substring/prefix match, skip edit-distance checks for this field.
  if (best > 0) return best;

  const maxEdits = maxAllowedEdits(token.length);

  if (maxEdits === 0) return 0;

  for (const word of field.words) {
    const distance = osaDistance(token, word, maxEdits);

    if (distance <= maxEdits) {
      best = Math.max(best, field.weight * (4 - distance));
      continue;
    }

    // Handle live-typing prefixes that contain a single typo (e.g. "aniamt" -> "animation").
    if (token.length >= 5 && word.length > token.length) {
      const prefixDistance = osaDistance(token, word.slice(0, token.length), 1);

      if (prefixDistance <= 1) {
        best = Math.max(best, field.weight * 1.5);
      }
    }
  }

  return best;
};

/**
 * @brief Tokenizes a user search query into normalized lowercase terms.
 */
export const tokenizeQuery = (rawQuery: string): string[] => splitWords(normalizeText(rawQuery));

/**
 * @brief Scores a search document against tokenized query terms.
 * @returns Positive relevance score if every token matches (exact, prefix, compound, or within typo tolerance), or `0`.
 */
export const scoreSearchDocument = (doc: SearchDocument, tokens: string[], normalizedQuery: string): number => {
  if (tokens.length === 0) return 1;

  let total = 0;

  for (const token of tokens) {
    let tokenBest = 0;

    for (const field of doc.fields) {
      const score = scoreTokenAgainstField(token, field);

      if (score > tokenBest) tokenBest = score;
    }

    if (tokenBest === 0) return 0;
    total += tokenBest;
  }

  // Bonus when the full normalized phrase matches a primary or secondary field verbatim.
  if (normalizedQuery.length > 0 && doc.fields.some((field) => field.normalized.includes(normalizedQuery))) {
    total += 8;
  }

  return total;
};
