import {Page, Locator} from '@playwright/test'

export class LoginPage {
    readonly page:Page
    readonly usernameInput:Locator
    readonly passwordInput:Locator
    readonly submitButton:Locator

constructor(page:Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.getByPlaceholder('Password')
    this.submitButton = page.locator('#login-button')
    }

    async loginIn(){
      await this.page.fill('#user-name','standard_user')
      await this.passwordInput.fill('secret_sauce')
      await this.submitButton.click()
    }
}