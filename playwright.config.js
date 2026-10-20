// playwright.config.js
// -----------------------------------------------------------------------------
// This file is the "control panel" for Playwright. It tells Playwright:
//   - where the tests live (the tests/ folder),
//   - which website the short addresses like "/inventory.html" belong to (baseURL),
//   - which browser to use (Chromium here),
//   - what evidence to keep when a test fails (screenshots and traces).
// You rarely need to change it in the early lessons.
// -----------------------------------------------------------------------------
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Stop a test that hangs forever: give each test at most 30 seconds.
  timeout: 30 * 1000,
  // Fail the build on CI if someone left a test.only() in the code.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    // Start every relative URL from the demo shop.
    baseURL: 'https://www.saucedemo.com',
    // Keep a trace (a step-by-step recording) only when a test is retried.
    trace: 'on-first-retry',
    // Save a screenshot only when a test fails.
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
