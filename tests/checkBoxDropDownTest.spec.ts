import { test, expect } from '@playwright/test';
import { SearchPage } from './page_objects/search_page';
import { LoginPage } from './page_objects/login_page'

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test.describe('testToDo WEBPAGE n Fill',() => {
  test('testing ToDoSearch', async({ page }) => {
    const searchPage = new SearchPage(page)
    await page.goto('https://demo.playwright.dev/todomvc/#/')
    await searchPage.placeholderSearch.fill('hi')
    await searchPage.placeholderSearch.press('Enter')
    await searchPage.placeholderSearch.fill('hello world')
    await searchPage.placeholderSearch.press('Enter')
    const textSearch= searchPage.listText.filter({hasText:"hi"}).getByRole('checkbox',{name:'Toggle Todo'})
    textSearch.check()
    await expect(textSearch).toBeChecked()
    await searchPage.activeLink.click()
    await expect(page.getByText('hello world')).toBeVisible()
  })

})

 test.describe('testcheckbox and dropdown Scenario', () => {
   test('forLoop-checkbox all',async({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php')
    const checkboxes = await page.$$("input[type='checkbox']")
    console.log(`totalcheckboxes: ${checkboxes.length}`)
    
    for(let i=0;i<checkboxes.length;i++){
      const isCheckbox = await checkboxes[i].isChecked()
      if(!isCheckbox){
        checkboxes[i].check()
        await page.waitForTimeout(1000)
      }
    }
    for(let i=0; i<checkboxes.length;i++){
      const isCheckbox = await checkboxes[i].isChecked()
      expect(isCheckbox).toBe(true)
    }
    console.log('All checkboxes checked')
   })

   test('forloop-dropdown all',async ({page}) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php')
    const dropdown = page.locator('#state');   // this is the <select> element

    await dropdown.selectOption({ label: 'Uttar Pradesh' });
    await expect(dropdown).toHaveValue('Uttar Pradesh')
  })
 })

 test.describe('login,validate list of product and extract their prices',() => {
   test('login to the page', async ({ page })=>{
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginIn()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
   })

   test('forLoop-ProductNames',async({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginIn()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    const productNames = await page.locator('.inventory_item_name ')
    const count = await productNames.count()
    let isProductPresent = false

    for(let i=0; i<count; i++){
      const name = await productNames.nth(i).innerText()
      console.log(`Product Title of ${i+1}: ${name}`)

      if(name.trim()==='Sauce Labs Bike Light'){
        isProductPresent = true
        break
      }
    }
    await expect(isProductPresent).toBe(true)
  })

  test('selectOption', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/')
    await loginPage.loginIn()
    await expect(page.locator('.title')).toHaveText('Products')
    
    
    // Select a sorting dropdown option
  const sortDropdown = page.locator('.product_sort_container');
  await sortDropdown.selectOption('lohi');

  // Verify sorting applied
  await expect(sortDropdown).toHaveValue('lohi');
  })

  test('Extract data and find specific information', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('.title')).toHaveText('Products')

  const priceLocators = page.locator('.inventory_item_price')
  const count = await priceLocators.count()
  console.log(count)
  let prices:number[]=[]

  for(let i=0; i<count; i++) {
    const text = await priceLocators.nth(i).innerText(); 
    console.log(`Price List ${i+1}: ${text}`)
    const priceInNumeric = parseFloat(text.replace('$',''))
    prices.push(priceInNumeric)
  }
  const lowestPrice = Math.min(...prices)
  console.log('Lowest Price Of the Product:',lowestPrice )

  await expect(lowestPrice).toBeGreaterThan(0)

  console.log('Extracted prices:', prices);
  console.log('Lowest price:', lowestPrice);
  })
 })