// tests/the-internet/dropdown.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.1 - Dropdowns (the <select> box)
//
// A dropdown shows one choice at a time. Behind the scenes every choice has
//   - a label  : the text the user sees, e.g. "Option 1"
//   - a value  : a hidden code the website uses, e.g. "1"
// A test can pick a choice by either one.
//
// New ideas in this lesson:
//   - test.use({ baseURL }) : the config points at saucedemo, but this file
//                             works on a different site, so it changes the
//                             base URL for the tests in this file only.
//   - getByRole('combobox') : a <select> box has the role "combobox".
//   - selectOption()        : picks a choice, the way a user would.
//   - toHaveValue()         : checks which choice is now selected (by value).
// -----------------------------------------------------------------------------
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

test.describe('Dropdown list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dropdown');
  });

  test('nothing is selected when the page opens', async ({ page }) => {
    // The placeholder "Please select an option" has an empty value.
    await expect(page.getByRole('combobox')).toHaveValue('');
  });

  test('a user can pick an option by its visible text', async ({ page }) => {
    const dropdown = page.getByRole('combobox');

    await dropdown.selectOption({ label: 'Option 2' });

    // "Option 2" has the hidden value "2".
    await expect(dropdown).toHaveValue('2');
  });

  test('a user can pick an option by its value', async ({ page }) => {
    const dropdown = page.getByRole('combobox');

    await dropdown.selectOption('1');

    await expect(dropdown).toHaveValue('1');
    // The selected <option> is also marked as selected for screen readers.
    await expect(page.getByRole('option', { name: 'Option 1' })).toHaveJSProperty('selected', true);
  });
});
