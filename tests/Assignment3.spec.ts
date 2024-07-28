import { test, expect } from '@playwright/test';

test('TC001 - Verify Checkboxes', async ({ page }) => {
    // Go to the website
    await page.goto('https://the-internet.herokuapp.com/');

    // Click on the link to navigate to the checkboxes page
    await page.getByRole('link').filter({ hasText: "Checkboxes" }).click();

    // Verify the header title "Checkboxes" is displayed
    const pageHeader = await page.getByRole('heading');
    await expect(pageHeader).toHaveText('Checkboxes');

    // Locate the checkboxes
    const checkbox1 = await page.getByRole('checkbox').first();
    const checkbox2 = await page.getByRole('checkbox').last();

    // Check the first checkbox
    await checkbox1.check();
    const isChecked1 = await checkbox1.isChecked();
    await expect(checkbox1).toBeChecked();
    console.log(`First checkbox is checked: ${isChecked1}`); 

    // Uncheck the second checkbox
    await checkbox2.uncheck();
    const isChecked2 = await checkbox2.isChecked();
    await expect(checkbox2).not.toBeChecked();
    console.log(`Second checkbox is checked: ${isChecked2}`); 

});

test('TC002 - Verify Drag and Drop', async ({ page }) => {
    // Go to the website
    await page.goto('https://the-internet.herokuapp.com/');

    // Click on the link to navigate to the drag and drop page
    await page.getByRole('link').filter({ hasText: "Drag and Drop" }).click();

    // Verify the header title "Drag and Drop" is displayed
    const pageHeader = await page.getByRole('heading');
    await expect(pageHeader).toHaveText('Drag and Drop');

    // Locate the elements to drag and drop
    const columnA = await page.locator('#column-a');
    const columnB = await page.locator('#column-b');

    // Perform the drag and drop action
    await columnA.dragTo(columnB);

    // Verify the result of the drag and drop action
    const newColumnAHeader = await columnA.locator('header').textContent();
    const newColumnBHeader = await columnB.locator('header').textContent();
    console.log(`New Column A Header: ${newColumnAHeader}`);
    console.log(`New Column B Header: ${newColumnBHeader}`);

});

test('TC003 - Verify Dropdown', async ({ page }) => {
    // Go to the website
    await page.goto('https://the-internet.herokuapp.com/');

    // Click on the link to navigate to the dropdown page
    await page.getByRole('link', { name: 'Dropdown' }).click();

    // Verify the header title "Dropdown List" is displayed
    const pageHeader = await page.getByRole('heading');
    await expect(pageHeader).toHaveText('Dropdown List');

    // Wait for the dropdown to be visible
    const dropdown = await page.locator('#dropdown');
    await dropdown.waitFor();

    // Select an option by value
    await dropdown.selectOption({ value: '1' }); // Selects the first option
    const selectedOption1 = await dropdown.inputValue();
    console.log(`Selected option value: ${selectedOption1}`); 

    // Select an option by label
    await dropdown.selectOption({ label: 'Option 2' }); 
    const selectedOption2 = await dropdown.inputValue();
    console.log(`Selected option value: ${selectedOption2}`); 

});

test('TC004 - Verify Frames', async ({ page }) => {
    //Step 1
    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
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

test('TC005 - Verify Upload file', async ({ page }) => {

// Go to the website
await page.goto('https://the-internet.herokuapp.com/');

// Select 'File Upload' link
await page.getByRole('link').filter({ hasText: "File Upload" }).click();

// Verify the "File Uploader" header is shown
const pageHeader = await page.getByRole('heading');
await page.waitForLoadState('domcontentloaded')
await expect(pageHeader).toHaveText('File Uploader');

// Select file and click upload then verify
await page.locator('#file-upload').setInputFiles(path.join(__dirname,'example.txt'));
await page.getByRole('button',{ name :"Upload"}).click();
await expect(pageHeader).toHaveText('File Uploaded!');
await expect(page.locator('#uploaded-file')).toHaveText('example.txt');
    
});

test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
    // Go to the URL
    await page.goto('https://the-internet.herokuapp.com/');

    // Click the "Dynamic Loading" link
    await page.getByRole('link').filter({ hasText: "Dynamic Loading" }).click();

    // Click on Example 1 link to navigate to the dynamically loaded page
    await page.getByText('Example 1').click();

    // Verify the "Dynamically Loaded Page Elements" header is shown
    const header = await page.getByRole('heading').filter({ hasText: "Dynamically Loaded" });
    await expect(header).toHaveText('Dynamically Loaded Page Elements');

    // Click the "Start" button to load the content dynamically
    await page.getByRole('button').click();

    // Verify the message "Hello World!" is displayed
    await expect(page.locator('#finish')).toHaveText('Hello World!');

});

test('TC007 - Verify input', async ({ page }) => {
    // Go to the URL
    await page.goto('https://testautomationpractice.blogspot.com/');

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

test('TC008 - Verify prompt dialog', async ({ page }) => {

    // Go to the URL
    await page.goto('https://testautomationpractice.blogspot.com');

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