import { test, expect } from '@playwright/test';


test('TC001 - Verify sort by price' , async ({ page }) => {

  // Go to the login page
  await page.goto('https://www.saucedemo.com/');

  // Input username and password
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');

  // Click login button
  await page.click('#login-button');

  // Verify that the error message is displayed
  const errorMessage = await page.textContent('h3[data-test="error"]');
  const expectedMessage = "Epic sadface: Sorry, this user has been locked out.";
  const isErrorMessageCorrect = errorMessage.includes(expectedMessage);
  console.log('Error message is correct:', isErrorMessageCorrect);

});

test('TC002 - Verify user can order product' ,async ({ page }) => {

// Go to the URL and login
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'standard_user');
await page.fill('#password', 'secret_sauce');
await page.click('#login-button');

// Wait for the inventory page to load and validate the "Products" heading is visible
await page.waitForSelector('.title');
const productsTitle = await page.isVisible('.title');
console.log('Products title is visible:', productsTitle);

// Add the first item to the cart
const firstItemName = await page.textContent('.inventory_item_name'); // Get the name of the first item
await page.click('.inventory_item:first-child button');
const buttonChanged = await page.isVisible('.inventory_item:first-child button', { hasText: 'Remove' });
console.log('Button text changed to "Remove":', buttonChanged);

// Validate the cart has '1' item
const cartBadge = await page.textContent('.shopping_cart_badge');
console.log('Number of items in cart:', cartBadge);

// Click on the cart and validate the pre-added item is visible
await page.click('.shopping_cart_link');
await page.waitForSelector('.cart_item');
const cartItemVisible = await page.isVisible('.cart_item');
console.log('Pre-added item is visible in the cart:', cartItemVisible);

// Validate the item name in the cart
const cartItemName = await page.textContent('.cart_item .inventory_item_name');
console.log('Item name in cart is correct:', cartItemName === firstItemName);

// Click checkout, input all required fields
await page.click('#checkout');
await page.fill('#first-name', 'John');
await page.fill('#last-name', 'Doe');
await page.fill('#postal-code', '12345');
await page.click('#continue');

// Validate the checkout page has the item added earlier
await page.waitForSelector('.cart_item');
const checkoutItemName = await page.textContent('.cart_item .inventory_item_name');
console.log('Item is visible on the checkout page:', checkoutItemName === firstItemName);

// Click Finish and validate the thank you message
await page.click('#finish');
const thankYouMsg = await page.textContent('.complete-header');
const ponyMsg = await page.textContent('.complete-text');
console.log('Thank you message:', thankYouMsg);
console.log('Pony message:', ponyMsg);

// Validate thank you messages
const thankYouMsgCorrect = thankYouMsg.includes('Thank you for your order!');
const ponyMsgCorrect = ponyMsg.includes('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
console.log('Thank you message is correct:', thankYouMsgCorrect);
console.log('Pony message is correct:', ponyMsgCorrect);


});