
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.safari()).build()

beforeEach(async () => {


        driver.get('http://localhost:3000/')
})

afterAll(async () => {

    driver.quit()

})

test('Title shows up when page loads', async () => {

        const title = await driver.findElement(By.id('title'))
        const displayed = await title.isDisplayed()
        expect(displayed).toBe(true)
      
})

test('When I click the draw button, All the options are displayed', async () => {

        const allOptions = await driver.findElement(By.id('draw'))
        const displayed = await allOptions.isDisplayed()
        expect(displayed).toBe(true)
      
})


test('When I click the "Add to Due" button displays the div', async () => {

        const allOptions = await driver.findElement(By.id('play-again'))
        const displayed = await allOptions.isDisplayed()
        expect(displayed).toBe(true)
      
})


