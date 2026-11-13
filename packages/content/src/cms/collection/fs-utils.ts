// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import fs from 'node:fs/promises';
import path from 'node:path';

const WORDS_PER_MINUTE = 220;

/**
 * @brief Estimates the reading time in minutes for a given content string.
 * @param content - The content string to estimate reading time for.
 * @returns The estimated reading time in minutes, rounded to the nearest whole number.
 * Returns a minimum of 1 minute for any non-empty content.
 */
export function estimateReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * @brief Recursively lists every `.mdx`/`.md` file under `dir`.
 * @param dir - The directory to search for MDX files.
 * @returns An array of file paths to all `.mdx`/`.md` files found under `dir`.
 * @details Dotfiles and dot-directories (e.g. `.git`) are skipped defensively.
 */
export async function walkMdxFiles(dir: string): Promise<string[]> {
  let entries: import('node:fs').Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  const subdirWalks: Promise<string[]>[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      subdirWalks.push(walkMdxFiles(fullPath));
    } else if (/\.mdx?$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  const nested = await Promise.all(subdirWalks);
  for (const group of nested) files.push(...group);

  return files;
}
