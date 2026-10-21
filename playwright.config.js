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
    // saucedemo marks its elements with data-test="...", so getByTestId()
    // should look at that attribute instead of the default data-testid.
    testIdAttribute: 'data-test',
    // Evidence for failed tests (open it from the HTML report):
    //   - trace: a step-by-step recording you can replay, with the page,
    //     network and console at every step. Kept only when a test fails.
    trace: 'retain-on-failure',
    //   - screenshot: a picture of the page at the moment of failure.
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
