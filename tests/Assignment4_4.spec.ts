import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('TC004 - Verify Frames', { tag: '@regression'} , async ({ page }) => {
    //Step 1
    await page.waitForLoadState;

    // Verify the page with 'Frames And Windows' text is shown
    const pageHeader = await page.locator('h1');
    await expect(pageHeader).toHaveText('Frames And Windows');

    // Click the "Iframe" tab
    const iframeTab = await page.locator('#iFrame');
    await iframeTab.click();

    // Input the search text "Playwright" into the search bar within the iframe
    const frameLocator = page.frameLocator('iframe[name="globalSqa"]');
    const searchBar = frameLocator.getByPlaceholder('Search...');
    await searchBar.fill('Playwright');

    // Verify the search bar displays the "Playwright" text
    const searchText = await searchBar.inputValue();
    console.log(`Search bar text: ${searchText}`);
    await expect(searchText).toBe('Playwright');

    // Click the "search" icon
    const searchButton = frameLocator.getByRole('button'); 
    await searchButton.click();

    // Verify the message "Sorry, no posts matched your criteria." is displayed
    const message = await frameLocator.locator('.search_res').textContent();
    console.log(`Message: ${message}`);
    await expect(message.trim()).toContain('Sorry, no posts matched your criteria.');

});