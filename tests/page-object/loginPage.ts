import { Page } from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) {}

    async loginViaIntersialPage(email: string, password: string) {
        await this.page.getByLabel('Email address').fill(email)
        await this.page.getByLabel('Password').fill(password)
        await this.page.getByRole('button', { name: 'Sign in' }).click()
        await this.page.waitForURL('**/account**')
    }
}
