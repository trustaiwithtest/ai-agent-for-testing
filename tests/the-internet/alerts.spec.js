// tests/the-internet/alerts.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.4 - Browser pop-ups (alert, confirm, prompt)
//
// These grey boxes come from the browser itself, not from the web page, so
// you cannot click them with a normal locator. There are three kinds:
//   - alert   : a message with an OK button.
//   - confirm : a question with OK and Cancel.
//   - prompt  : a question with a text box, OK and Cancel.
//
// New ideas in this lesson:
//   - page.once('dialog', handler) : "the next time a pop-up appears, run this
//                                    code". We set it up BEFORE clicking the
//                                    button that opens the pop-up.
//   - dialog.message()             : the text shown in the pop-up.
//   - dialog.accept() / dismiss()  : press OK / press Cancel.
//   - dialog.accept('text')        : type into a prompt, then press OK.
//   - Playwright's default         : if no handler is set up, Playwright
//                                    presses Cancel for you, so a pop-up never
//                                    freezes a test.
//
// After each pop-up, the page writes what happened under "Result:".
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.describe('JavaScript pop-ups', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/javascript_alerts');
  });

  test('an alert shows its message and can be closed with OK', async ({ page }) => {
    let message;
    page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    expect(message).toBe('I am a JS Alert');
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('a confirm box can be accepted with OK', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept());

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('a confirm box can be dismissed with Cancel', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.dismiss());

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('a prompt accepts the text the user types', async ({ page }) => {
    page.once('dialog', (dialog) => dialog.accept('Hello Playwright'));

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    await expect(page.locator('#result')).toHaveText('You entered: Hello Playwright');
  });

  test('without a handler, Playwright presses Cancel for us', async ({ page }) => {
    // No page.once('dialog') here on purpose.
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });
});
