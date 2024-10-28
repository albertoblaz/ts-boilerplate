import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// runs a clean after each test case (e.g. clearing Vite's embedded jsdom implementation)
afterEach(() => {
  cleanup();
});
