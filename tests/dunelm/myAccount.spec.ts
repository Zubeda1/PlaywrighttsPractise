import { test, expect } from '@playwright/test'

test.describe('My Account', () => {
    test('should display account page', async ({ page }) => {
    await page.goto('https://dunelm.com/product/egyptian-cotton-towel-1000248815?defaultSkuId=30924008')
    await expect(page.getByRole('heading', { name: 'Egyptian Cotton Towel' }).first).toBeVisible()
    })
})
