import turboPlugin from 'eslint-config-turbo/flat';
import js from '@eslint/js';
import ts from 'typescript-eslint';

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...turboPlugin,
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.turbo/**', '**/pnpm-lock.yaml']
  }
];
