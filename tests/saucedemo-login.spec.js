// tests/saucedemo-login.spec.js
// -----------------------------------------------------------------------------
// LESSON 0 - Your first Playwright test
//
// What this test does, in plain words:
//   1. Opens the Swag Labs demo shop (https://www.saucedemo.com).
//   2. Types a valid username and password.
//   3. Clicks the Login button.
//   4. Checks that we landed on the products page.
//
// Three ideas to notice:
//   - test()    : describes ONE scenario (a single check from start to finish).
//   - page      : the browser tab Playwright controls for us.
//   - expect()  : an assertion. It waits (up to a few seconds) for the page to
//                 show what we expect, so we never need manual sleeps.
//
// The username and password are the public demo credentials published on the
// saucedemo.com login page. They are not real secrets.
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test('a standard user can log in and see the products page', async ({ page }) => {
  // Step 1: open the login page (baseURL from playwright.config.js is used).
  await page.goto('/');

  // Step 2: find the fields by the text a real user sees, then type into them.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Step 3: click the Login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 4: check the result. The URL changes to the inventory page...
  await expect(page).toHaveURL(/inventory\.html$/);
  // ...and the page title reads "Products".
  await expect(page.locator('.title')).toHaveText('Products');
});
