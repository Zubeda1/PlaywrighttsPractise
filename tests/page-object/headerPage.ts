import { Locator, Page } from '@playwright/test'

export class MainPage{
    readonly page: Page
    readonly linkStart: Locator

 constructor (page: Page) {
    this.page = page
    this.linkStart = page.getByRole('link',{name: 'Get started'})
 }
}