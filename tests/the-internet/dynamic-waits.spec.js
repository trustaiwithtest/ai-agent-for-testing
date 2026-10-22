// tests/the-internet/dynamic-waits.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.6 - Waiting for things that appear later
//
// Modern pages load content after you click: a spinner shows, then the result
// appears. A test that checks too early fails, even though nothing is broken.
// These are called "flaky" tests, and waiting badly is their top cause.
//
// The page has two versions of the same trick. Press Start, a loading bar
// runs for about 5 seconds, then "Hello World!" appears:
//   Example 1: the text is already on the page but HIDDEN until loading ends.
//   Example 2: the text does NOT EXIST on the page until loading ends.
//
// New ideas in this lesson:
//   - Auto-waiting assertions : expect(...).toBeVisible() keeps re-checking
//                               until it passes or the timeout runs out. The
//                               default is 5 seconds. Loading here can take
//                               about that long, so we allow 10.
//   - { timeout: 10_000 }     : a longer wait for this ONE check only. The
//                               test still moves on the moment the text shows.
//   - What NOT to do          : page.waitForTimeout(5000) ("sleep 5 seconds")
//                               always wastes the full 5 seconds, and still
//                               fails on a slow day. Wait for a RESULT instead.
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.describe('Dynamic loading', () => {
  test('example 1: hidden text becomes visible after loading', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    const hello = page.getByRole('heading', { name: 'Hello World!' });

    // Before Start, the text exists but is hidden.
    await expect(hello).toBeHidden();

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(hello).toBeVisible({ timeout: 10_000 });
  });

  test('example 2: text is added to the page after loading', async ({ page }) => {
    await page.goto('/dynamic_loading/2');
    const hello = page.getByRole('heading', { name: 'Hello World!' });

    // Before Start, the text is not on the page at all.
    await expect(hello).toHaveCount(0);

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(hello).toBeVisible({ timeout: 10_000 });
    // The loading bar is gone once the result is shown.
    await expect(page.getByText('Loading...')).toBeHidden();
  });
});
