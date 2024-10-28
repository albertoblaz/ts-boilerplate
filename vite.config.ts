/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslist from 'browserslist';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { browserslistToTargets } from 'lightningcss';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  base: '',
  build: {
    cssMinify: 'lightningcss',
    target: browserslistToEsbuild(),
    rollupOptions: {
      logLevel: 'info',
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist("> 0.25%, not dead")),
    }
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets/'), // DO NOT remove this line or assets won't be included in the build
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
