import { test, expect } from '@playwright/test'
import { MainPage } from'./page-object/headerPage'

test.describe('should have header', () => {
  test('has title', async ({ page }) => {

    await page.goto('https://playwright.dev/')
    await expect(page).toHaveTitle(/Playwright/)
  })

  test('get started link', async({ page })=>{
    const mainPage = new MainPage(page)
    await page.goto('https://playwright.dev/')
    
    // Click the get started link.
    await mainPage.linkStart.click()

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
    await page.screenshot({ path: 'example.png' })
  })
})


