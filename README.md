# AI Agent for Testing

A tutorial project for functional and non-functional test automation with AI assistance.

- Front-end automation with Playwright (in progress)
- Back-end automation with Spring Boot or REST Assured (planned)
- Performance testing with Gatling (planned)

See [PLAN.md](PLAN.md) for the roadmap and [PROGRESS.md](PROGRESS.md) for status.

## Getting started (Phase 0)

You need Node.js LTS (version 18 or newer) installed.

1. Install the project's tools:
   ```bash
   npm install
   ```
2. Download the Chromium browser that Playwright uses:
   ```bash
   npx playwright install chromium
   ```
3. Run the tests:
   ```bash
   npm test
   ```
4. Open the HTML report after a run:
   ```bash
   npm run test:report
   ```
   To watch the browser while the tests run, use `npm run test:headed`.
   To step through tests one action at a time, use `npm run test:ui`.

## When a test fails

Playwright keeps evidence for every failed test in `test-results/`:

- `test-failed-1.png` - a screenshot of the page at the moment it failed.
- `trace.zip` - a full recording. Open it from the HTML report (`npm run test:report`, then click the failed test and "Trace"), or run `npx playwright show-trace <path-to-trace.zip>`. You can scroll through every step and see the page, clicks, network calls and console messages.

## Project layout

| Folder / file | What it is for |
|---|---|
| `tests/` | The test files. Each `*.spec.js` file holds one or more test scenarios. |
| `pages/` | Page Object classes (added in Phase 3). |
| `fixtures/` | Shared setup code, such as a logged-in browser page (Phase 3). |
| `test-data/` | Test data files: a sample file for the upload lesson now, JSON users later (Phase 4). |
| `playwright.config.js` | Playwright settings: base URL, browser, reports. |
| `PLAN.md` | The learning roadmap. |
| `PROGRESS.md` | What has been done so far. |

## Lessons so far

- **Lesson 0**: opens the Swag Labs demo shop, logs in as a standard user and checks the products page.
- **Lesson 1 - `tests/saucedemo-login.spec.js`**: tests the login page from four angles: valid user, locked-out user, wrong password and empty form. Introduces `test.describe`, `beforeEach`, user-facing locators (`getByLabel`, `getByRole`, `getByTestId`), auto-waiting, and screenshots and traces on failure.
- **Lesson 2 - `tests/the-internet/`**: one file per tricky page element, on the-internet.herokuapp.com. Each file sets its own base URL with `test.use`.
  - `dropdown.spec.js` - picking from a `<select>` with `selectOption()`, checking it with `toHaveValue()`.
  - `checkboxes.spec.js` - `check()` and `uncheck()` rather than `click()`, and `toBeChecked()`.
  - `iframes.spec.js` - reaching inside frames, including frames inside frames, with `frameLocator()`.
  - `alerts.spec.js` - browser pop-ups (alert, confirm, prompt) with `page.once('dialog')`.
  - `file-upload.spec.js` - uploading a file with `setInputFiles()`.
  - `dynamic-waits.spec.js` - waiting for content that appears late, without `sleep`.

  Run just this lesson with `npx playwright test tests/the-internet`.
