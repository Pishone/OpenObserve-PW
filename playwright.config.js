// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  globalSetup: require.resolve('./global-setup.js'),

  use: {
    baseURL: 'http://localhost:5080',
    storageState: 'auth.json',
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    // screenshot: 'only-on-failure',
  },

  reporter: [['html', { open: 'never' }]],
});
