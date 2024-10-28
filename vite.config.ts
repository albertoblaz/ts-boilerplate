/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  base: '',
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets/'), // DO NOT remove this line or assets won't be included in the build
    },
  },
  build: {
    target: browserslistToEsbuild(),
    rollupOptions: {
      logLevel: 'info',
    },
  },
  plugins: [react(), tsconfigPaths()],
});
