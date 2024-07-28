import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/');
  //await page.getByRole('link', { name: 'Login Form' }).click();
  await page.getByRole('heading').filter({hasText: "Login Form"}).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('practice');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('alert')).toHaveText('You logged into a secure area!');
});