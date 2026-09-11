import { Locator, Page } from "@playwright/test";

export class SearchPage{
    readonly page:Page
    readonly placeholderSearch: Locator
    readonly listText: Locator
    readonly checkBox: Locator
    readonly activeLink:Locator
    readonly priceLocator:Locator

  constructor ( page:Page ){
    this.page = page
    this.placeholderSearch = page.getByPlaceholder('What needs to be done?')
    this.listText = page.getByTestId("todo-item")
    this.checkBox = page.getByRole('checkbox',{name:'Toggle Todo'})
    this.activeLink = page.getByRole('link',{name:'Active'})
    this.priceLocator = page.locator('.inventory_item_price');
  }
}