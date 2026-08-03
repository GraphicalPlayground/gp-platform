// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import onlyWarnPlugin from 'eslint-plugin-only-warn';
import prettierPlugin from 'eslint-plugin-prettier';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const config = defineConfig([
  // ESLint recommended rules
  js.configs.recommended,
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  // Prettier config - disables conflicting ESLint rules
  {
    rules: {
      ...prettierConfig.rules
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.es2025
      },
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      },
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'import': importPlugin,
      'only-warn': onlyWarnPlugin,
      'prettier': prettierPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'object-curly-spacing': 'off',
      'react/jsx-sort-props': 'off',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
        { blankLine: 'always', next: 'return', prev: '*' }
      ],
      'prettier/prettier': 'error',
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        {
          caseSensitive: true
        }
      ],
      'sort-imports': 'off',
      'sort-keys': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          vars: 'all',
          varsIgnorePattern: '^_'
        }
      ]
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true
      }
    }
  },
  // Disable type checking for config files (.*.js, .*.cjs, .*.mjs)
  {
    files: ['.*.js', '.*.cjs', '.*.mjs'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    ignores: [
      '**/.temp/**',
      '**/.next/**',
      '**/.swc/**',
      '**/.turbo/**',
      '**/.cache/**',
      '**/.build/**',
      '**/.vercel/**',
      '**/.DS_Store',
      '**/dist/**',
      '**/build/**',
      '**/public/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.contentlayer/',
      '**/__snapshots__/**',
      '**/pnpm-lock.yaml',
      '**/.source/**',
      '**/next-env.d.ts',
      '!.vscode/**',
      '!scripts/**'
    ]
  }
]);

export default config;
