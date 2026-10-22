// tests/the-internet/file-upload.spec.js
// -----------------------------------------------------------------------------
// LESSON 2.5 - Uploading a file
//
// Clicking "Choose File" opens your computer's file picker, which a test
// cannot click through. Instead, Playwright hands the file straight to the
// file input, exactly as if the user had picked it.
//
// New ideas in this lesson:
//   - setInputFiles(path) : attaches a file to an <input type="file">.
//   - path.join(__dirname, ...) : builds the file's path starting from THIS
//                                 test file's folder, so the test works no
//                                 matter which folder you run it from.
//   - Test files in test-data/ : the sample file is kept in the repo, so
//                                every run uploads the same thing.
// -----------------------------------------------------------------------------
const path = require('path');
const { test, expect } = require('@playwright/test');

test.use({ baseURL: 'https://the-internet.herokuapp.com' });

const sampleFile = path.join(__dirname, '..', '..', 'test-data', 'sample-upload.txt');

test.describe('File upload', () => {
  test('a user can upload a text file', async ({ page }) => {
    await page.goto('/upload');

    // The file input has the id "file-upload" and no visible label.
    await page.locator('#file-upload').setInputFiles(sampleFile);
    await page.getByRole('button', { name: 'Upload' }).click();

    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    // The page lists the name of the file it received.
    await expect(page.locator('#uploaded-files')).toHaveText('sample-upload.txt');
  });
});
