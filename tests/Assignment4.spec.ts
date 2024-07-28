import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.skip('TC001 - Verify Checkboxes', { tag: '@regression'} , async ({ page }) => {

    await page.goto('/');

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

test('TC002 - Verify Drag and Drop',  { tag: ['@smoke' , '@regression']} ,async ({ page }) => {

    await page.goto('/');
    
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

test.fail ('TC003 - Verify Dropdown',  { tag: '@regression'} ,async ({ page }) => {

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

test('TC005 - Verify Upload file',   { tag: ['@smoke' , '@regression']},async ({ page }) => {

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

test('TC006 - Verify Dynamically Loaded Page Elements',  { tag: ['@smoke' , '@regression']} ,async ({ page }) => {

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

