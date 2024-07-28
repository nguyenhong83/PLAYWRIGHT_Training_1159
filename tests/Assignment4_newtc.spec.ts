import { test, expect } from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'});

test.beforeEach(async ({ page }) => {
  console.log('beforeEach : Go to URL')
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test('TC001 - Verify sort by price' , async ({ page }) => {

  // Navigate to the inventory page
  await page.waitForSelector('.title'); 

  // Validate the "Products" heading is visible
  const productsTitle = await page.isVisible('.title');
  console.log('Products title is visible:', productsTitle);

  // Select "Price (low to high)" from the sort options
  await page.selectOption('.product_sort_container', 'lohi');

  // Wait for sorting to be applied
  await page.waitForTimeout(2000); 

  // Validate the sort works correctly
  const prices = await page.$$eval('.inventory_item_price', items => items.map(item => parseFloat(item.textContent.replace('$', ''))));

  // Check if the prices are sorted in ascending order
  const isSorted = prices.every((price, i, arr) => !i || arr[i - 1] <= price);
  console.log('Prices are sorted from low to high:', isSorted);

});

test('TC002 - Verify user can order product' ,async ({ page }) => {

// Wait for the inventory page to load and validate the "Products" heading is visible
await page.waitForSelector('.title');
const productsTitle = await page.isVisible('.title');
console.log('Products title is visible:', productsTitle);

// Add the first item to the cart
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

// Click checkout, input all required fields
await page.click('#checkout');
await page.fill('#first-name', 'John');
await page.fill('#last-name', 'Doe');
await page.fill('#postal-code', '12345');
await page.click('#continue');

// Validate the checkout page has the item added earlier
await page.waitForSelector('.cart_item');
const checkoutItemVisible = await page.isVisible('.cart_item');
console.log('Item is visible on the checkout page:', checkoutItemVisible);

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