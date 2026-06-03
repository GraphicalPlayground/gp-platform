import baseConfig from '@gp/standard/eslint/node.mjs';
import { defineConfig } from 'eslint/config';

const config = defineConfig([...baseConfig]);

export default config;
