import { chromium } from '@playwright/test'
import fs from 'fs'

export interface User {
  email: string
  handle: string
  password: string
  stateFile: string
}

// setup('authenticate', async ({ page }) => {
//     const loginPage = new LoginPage(page)
//     await loginPage.login(process.env.DUNELM_EMAIL!, process.env.DUNELM_PASSWORD!)
//     await page.context().storageState({ path: '.auth/user.json' })
// })

async function authenticateUser(user: User, domain: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(`${domain}/search?q=sheet`, {
      timeout: 60_000,
      waitUntil: 'domcontentloaded',
    })
    await page.waitForTimeout(5000) // 5 sec

    // Handle any cookie notifications
    const cookieButton = page.getByRole('button', { name: 'Allow All' })
    if (await cookieButton.isVisible()) {
      await cookieButton.click()
      await page.waitForTimeout(1000) // 1 sec
    }

    // Try to close any open dialogs first
    const dialogs = page.locator('dialog[open]')
    if ((await dialogs.count()) > 0) {
      await dialogs.first().locator('button').first().click()
      await page.waitForTimeout(1000)
    }

    // Click X to close any modal if present
    const closeButton = page.getByRole('button', {
      name: 'Close popup message',
    })

    if (await closeButton.isVisible()) {
      await closeButton.click()
      await page.waitForTimeout(1000)
    }

    const myAccountButton = page
      .getByRole('button', {
        name: 'My Account',
      })
      .first()
    await myAccountButton.click()

    await page.waitForTimeout(1000)
    const signInButton = page.getByRole('button', { name: /sign in/i })
    await signInButton.click()

    await page.waitForURL(/auth.dun/)
    await page.waitForLoadState('load')
    await page.getByRole('textbox', { name: 'Email' }).fill(user.email)
    await page.getByLabel('Password').fill(user.password)
    await page.getByRole('button', { name: 'Sign In' }).last().click()
    await page.waitForURL(/\/search/)
    await page.waitForTimeout(5000)

    // Save authentication state
    fs.mkdirSync(require('path').dirname(user.stateFile), { recursive: true })
    await page.context().storageState({ path: user.stateFile })
    console.log(
      `Authentication setup completed successfully for ${user.handle}`
    )
  } finally {
    await browser.close()
  }
}

export async function globalSetup(user: User) {
  const domain = 'https://dunelm.com'

  try {
    console.log(
      `Authentication setup started for ${user.handle} user - ${user.email}, using domain: ${domain}`
    )
    await authenticateUser(user, domain)
  } catch (error) {
    console.error('Global setup failed:', error)
    throw error
  }
}
