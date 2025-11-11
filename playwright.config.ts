import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  timeout: 70000,

  // Runs once before all tests (conditionally handles login setup)
  globalSetup: './globalsetup.ts',

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium-auth',
      testIgnore: /.*Login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, 'auth.json'),
        headless: true,
        locale: 'en-US', // Set browser language to English
      },
    },
    {
      name: 'chromium-login',
      testMatch: /.*Login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
        headless: true,
        locale: 'en-US', // Set browser language to English
      },
    },
  ],
});
