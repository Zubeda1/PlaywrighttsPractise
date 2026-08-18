import { Page, Locator  } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly emailInput:Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.getByLabel('Emial address')
    }

    async loginViaIntersialPage(email: string, password: string) {
        this.emailInput.fill(email)
        await this.page.getByLabel('Password').fill(password)
        await this.page.getByRole('button', { name: 'Sign in' }).click()
        await this.page.waitForURL('**/account**')
    }
}
