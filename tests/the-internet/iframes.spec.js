// tests/the-internet/iframes.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.3 - Frames: a page inside a page
//
// A frame (or iframe) shows a separate web page inside the current one. Ads,
// payment forms, video players and rich text editors often live in frames.
// The catch: page.getByText() only searches the OUTER page. It cannot see
// inside a frame, so we must first "step into" the frame.
//
// New ideas in this lesson:
//   - page.frameLocator(selector) : points at a frame. Locators called on it
//                                   search inside that frame.
//   - Chaining frameLocator()     : frames can hold frames. We step in one
//                                   level at a time: outer frame, then inner.
//   - CSS selectors like frame[name="frame-top"] : frames have no role or
//     text of their own, so we find them by their name attribute.
//
// Pages used:
//   /nested_frames : a top frame (split into LEFT, MIDDLE, RIGHT) and a
//                    bottom frame (BOTTOM).
//   /iframe        : a TinyMCE text editor, which lives in an iframe.
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.describe('Nested frames', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nested_frames');
  });

  test('the bottom frame says BOTTOM', async ({ page }) => {
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');

    await expect(bottomFrame.locator('body')).toHaveText('BOTTOM');
  });

  test('the middle frame inside the top frame says MIDDLE', async ({ page }) => {
    // Step 1: into the top frame. Step 2: into the middle frame inside it.
    const middleFrame = page
      .frameLocator('frame[name="frame-top"]')
      .frameLocator('frame[name="frame-middle"]');

    await expect(middleFrame.locator('#content')).toHaveText('MIDDLE');
  });

  test('the outer page cannot see text inside a frame', async ({ page }) => {
    // Without frameLocator, Playwright finds nothing. This is the most common
    // reason a "visible" element cannot be found in a test.
    await expect(page.getByText('BOTTOM')).toHaveCount(0);
  });
});

test.describe('iFrame with a text editor', () => {
  test('the editor shows its starting text', async ({ page }) => {
    await page.goto('/iframe');

    // TinyMCE gives its iframe the id "mce_0_ifr". The text area inside is
    // the <body> of that inner page.
    const editor = page.frameLocator('#mce_0_ifr').locator('body');

    await expect(editor).toHaveText('Your content goes here.');
  });
});
