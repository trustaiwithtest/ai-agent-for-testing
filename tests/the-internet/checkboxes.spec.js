// tests/the-internet/checkboxes.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.2 - Checkboxes
//
// The page has two checkboxes: the first starts unticked, the second ticked.
//
// New ideas in this lesson:
//   - getByRole('checkbox') : finds every checkbox. .nth(0) is the first one,
//                             .nth(1) the second (counting starts at 0).
//                             These checkboxes have no proper label, so we
//                             pick them by position. On a real project you
//                             would ask developers to add labels.
//   - check() / uncheck()   : set the checkbox to a known state.
//                             Why not click()? click() just FLIPS the box, so
//                             if it was already ticked, click() unticks it.
//                             check() leaves a ticked box alone, so the test
//                             does what it says no matter how it starts.
//   - toBeChecked()         : checks that the box is ticked.
//     not.toBeChecked()     : checks that it is NOT ticked.
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.describe('Checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkboxes');
  });

  test('the page starts with box 1 unticked and box 2 ticked', async ({ page }) => {
    const boxes = page.getByRole('checkbox');

    await expect(boxes).toHaveCount(2);
    await expect(boxes.nth(0)).not.toBeChecked();
    await expect(boxes.nth(1)).toBeChecked();
  });

  test('a user can tick the first box', async ({ page }) => {
    const firstBox = page.getByRole('checkbox').nth(0);

    await firstBox.check();

    await expect(firstBox).toBeChecked();
  });

  test('a user can untick the second box', async ({ page }) => {
    const secondBox = page.getByRole('checkbox').nth(1);

    await secondBox.uncheck();

    await expect(secondBox).not.toBeChecked();
  });

  test('check() on an already ticked box keeps it ticked', async ({ page }) => {
    const secondBox = page.getByRole('checkbox').nth(1);

    // The box is already ticked. click() would untick it; check() does not.
    await secondBox.check();

    await expect(secondBox).toBeChecked();
  });
});
