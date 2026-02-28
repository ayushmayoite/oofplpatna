import { test, expect } from '@playwright/test';

test.describe('Homepage & Category Grid', () => {
  test('should not have duplicate category links on the homepage', async ({ page }) => {
    // Navigate to the local dev server
    await page.goto('http://localhost:3000/');

    // Find all links that go to /products/seating
    const seatingLinks = await page.locator('a[href="/products/seating"]').count();

    // There should only be ONE seating category link if the data duplicate bug is fixed
    expect(seatingLinks).toBe(1);
  });

  test('should render the hero section correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Check if the main hero title is visible
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('category grid images should load without errors', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const categoryImages = page.locator('.group img');
    const count = await categoryImages.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(categoryImages.nth(i)).toBeVisible();
    }
  });
});
