/** Dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'react-native': false
    }
  },
  optimizeDeps: {
    include: ['@storybook/theming', '@mdx-js/react'],
    exclude: ['react-native']
  }
});
