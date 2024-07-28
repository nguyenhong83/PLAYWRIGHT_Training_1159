import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('TC007 - Verify input',  { tag: '@regression'} ,async ({ page }) => {
    // Go to the URL
    await page.goto('/');

    // Verify that the header is displayed
    const header = await page.locator('h1');
    await expect(header).toBeVisible();

    // Fill the name field and verify the inputted value
    const nameInput = page.locator('#name');
    await nameInput.fill('Hong Nguyen');
    const nameValue = await nameInput.inputValue();
    console.log(`Name input value: ${nameValue}`);
    await expect(nameValue).toBe('Hong Nguyen');

    // Fill the address field and verify the textarea displays the inputted value
    const addressTextarea = page.locator('#textarea');
    await addressTextarea.fill('Nha Trang city');
    const addressValue = await addressTextarea.inputValue();
    console.log(`Address textarea value: ${addressValue}`);
    await expect(addressValue).toBe('Nha Trang city');

    // Clear the name field and verify that it is cleared
    await nameInput.fill('');
    const clearedNameValue = await nameInput.inputValue();
    console.log(`Cleared name input value: ${clearedNameValue}`);
    await expect(clearedNameValue).toBe('');

    // Clear the address field and verify that it is cleared
    await addressTextarea.fill('');
    const clearedAddressValue = await addressTextarea.inputValue();
    console.log(`Cleared address textarea value: ${clearedAddressValue}`);
    await expect(clearedAddressValue).toBe('');
    
});

test('TC008 - Verify prompt dialog',  { tag: '@regression'} ,async ({ page }) => {

    // Go to the URL
    await page.goto('/');

    // Verify the header is displayed
    const header = await page.locator('h1');
    await expect(header).toBeVisible();

    // Click the "Prompt" button to trigger the prompt dialog
    const promptButton = await page.getByText('Prompt');
    promptButton.click();
    const [dialog] = await Promise.all([page.waitForEvent('dialog')]);

    // Verify the default prompt message and value
    const defaultPromptMessage = dialog.message();
    console.log(`Default prompt message: ${defaultPromptMessage}`);
    const defaultPromptValue = dialog.defaultValue();
    console.log(`Default prompt value: ${defaultPromptValue}`);
    await expect(defaultPromptMessage).toBe('Please enter your name:');
    await expect(defaultPromptValue).toBe('Harry Potter');

    // Accept the prompt with a specified name
    const yourName = 'Hong Nguyen';
    await dialog.accept(yourName);

    // Verify the resulting message after accepting the prompt
    const resultMessage = await page.locator('#demo').textContent();
    console.log(`Result message: ${resultMessage}`);
    await expect(resultMessage).toBe(`Hello ${yourName}! How are you today?`);

});