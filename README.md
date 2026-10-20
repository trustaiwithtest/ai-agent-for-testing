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

## Project layout

| Folder / file | What it is for |
|---|---|
| `tests/` | The test files. Each `*.spec.js` file holds one or more test scenarios. |
| `pages/` | Page Object classes (added in Phase 3). |
| `fixtures/` | Shared setup code, such as a logged-in browser page (Phase 3). |
| `test-data/` | Test data files, such as JSON users (Phase 4). |
| `playwright.config.js` | Playwright settings: base URL, browser, reports. |
| `PLAN.md` | The learning roadmap. |
| `PROGRESS.md` | What has been done so far. |

## Lessons so far

- **Lesson 0 - `tests/saucedemo-login.spec.js`**: opens the Swag Labs demo shop, logs in as a standard user and checks the products page.
