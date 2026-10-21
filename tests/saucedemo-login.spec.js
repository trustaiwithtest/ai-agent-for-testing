// tests/saucedemo-login.spec.js
// -----------------------------------------------------------------------------
// LESSON 1 - Testing a login page: the happy path and the unhappy paths
//
// A login page is never tested with one scenario only. We check:
//   1. A valid user gets in and sees the products page.     (happy path)
//   2. A locked-out user is stopped with a clear message.   (business rule)
//   3. A wrong password is rejected.                        (bad input)
//   4. An empty form is rejected.                           (missing input)
//
// New ideas in this lesson:
//   - test.describe() : groups related tests under one heading in the report.
//   - test.beforeEach(): code that runs before EVERY test in the group, so we
//                        do not repeat "open the login page" four times.
//   - Locators that read like a user would describe the page:
//       getByLabel('Username')            -> the field labelled "Username"
//       getByRole('button', {name: ...})  -> the button with that text
//       getByRole('alert')                -> the error box (it has role="alert")
//       getByTestId('title')              -> an element with data-test="title"
//                                            (set in playwright.config.js)
//   - Auto-waiting: click() waits until the button is visible and enabled, and
//     expect() keeps re-checking for up to 5 seconds. No sleep() needed.
//
// The usernames and the password "secret_sauce" are public demo credentials
// published on the saucedemo.com login page. They are not real secrets.
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    // Every test starts on the login page (baseURL from playwright.config.js).
    await page.goto('/');
  });

  test('a standard user can log in and see the products page', async ({ page }) => {
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // The URL changes to the inventory page...
    await expect(page).toHaveURL(/inventory\.html$/);
    // ...and the page heading reads "Products".
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('a locked-out user sees an error and stays on the login page', async ({ page }) => {
    await page.getByLabel('Username').fill('locked_out_user');
    await page.getByLabel('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    // We did NOT get into the shop.
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('a wrong password is rejected', async ({ page }) => {
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('an empty form asks for the username first', async ({ page }) => {
    // Click Login without typing anything.
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Username is required');
  });
});
