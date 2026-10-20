# AI Agent for Testing - Front-end Automation Plan (Playwright)

Purpose: a tutorial-style project that teaches functional test automation with Playwright, explained so non-testers can follow it. It will later be published on GitHub.

## Target sites
- saucedemo.com - main site (login, inventory, cart, checkout; built-in problem users).
- the-internet.herokuapp.com - individual UI widgets (dropdowns, iframes, alerts, uploads, waits).
- demoqa.com - forms, tables, frames, windows.
- automationexercise.com - fuller e-commerce flows (later).
- practicesoftwaretesting.com - realistic app with sign-in and invoices (later).
- Stretch goal: vscode.dev (IDE-style UI, Monaco editor) after locators and waits are solid.
Note: site availability and content must be re-checked before each lesson.

## Phases
0. Setup: Node LTS, Playwright install, repo layout (tests/, pages/, fixtures/, test-data/, .github/workflows/), README in plain language.
1. First tests: saucedemo login (valid, locked-out user, wrong password); getByRole/getByLabel locators; auto-waiting; expect assertions; HTML report, screenshots and traces on failure.
2. Core UI skills on the-internet: one spec per concept, each with an explanatory header comment.
3. Page Object Model and a full purchase flow on saucedemo; custom fixture for a logged-in page.
4. Data and config: JSON test data, parameterized tests, env variables via .env (not committed), storageState reuse.
5. MCP integration: Playwright MCP server (Microsoft) for exploring pages and suggesting locators; Claude drafts, human reviews.
6. Hardening: axe accessibility checks, visual snapshots, page.route API mocking, GitHub Actions CI, tags (@smoke, @regression).
7. Then: a more robust framework (layered structure, per-environment config, richer reporting, sharding, test-data strategy).

## Decisions
- Phase 0 target: saucedemo, as the first lesson.
- Repo: to be created under github.com/trustaiwithtest (name to confirm, proposed: ai-agent-for-testing).
