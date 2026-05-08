import turboPlugin from 'eslint-config-turbo/flat';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...turboPlugin,
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  },
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.turbo/**']
  }
];
