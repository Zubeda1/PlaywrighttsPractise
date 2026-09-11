import { test, expect } from '@playwright/test';
import { LoginPage } from './page_objects/login_page';
import { SearchPage } from './page_objects/search_page';

test('Extract data and find specific information', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const searchPage = new SearchPage(page)
  await page.goto('https://www.saucedemo.com/');
  await loginPage.loginIn()

  // Extract all prices
  const priceLocators = await searchPage.priceLocator 
  const count = await priceLocators.count();

  const prices: number[] = [];

  for (let i = 0; i < count; i++) {
    const text = await priceLocators.nth(i).innerText(); // e.g. "$29.99"
    const numeric = parseFloat(text.replace('$', ''));
    prices.push(numeric);
  }

  // Find lowest price
  const lowestPrice = Math.min(...prices);

  // Verify lowest price is correct
  expect(lowestPrice).toBeGreaterThan(0);

  console.log('Extracted prices:', prices);
  console.log('Lowest price:', lowestPrice);
});