/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
  },
  base: '',
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app/'),
      '@assets': path.resolve(__dirname, 'assets/'),
    },
  },
  build: {
    target: browserslistToEsbuild('0.2% and last 2.5 years'), // Baseline Widely Adopted
    rollupOptions: {
      logLevel: 'info',
    },
  },
  plugins: [react()],
});
