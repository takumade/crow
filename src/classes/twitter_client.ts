
import { Browser } from './browser'

export class TwitterClient{

    browser: Browser

    constructor(browser: Browser){
        this.browser = browser
    }

    async login(username: string, password: string){
        try{
            console.log(this.browser)
            await this.browser.goToPage(
                "https://twitter.com/i/flow/login",
                "css",
                "[autocomplete='username']")

            // Enter username 
            let usernameInput = await this.browser.getElement("css", "[autocomplete='username']")
            usernameInput.sendKeys(username)
            await this.browser.driver.sleep(2000)
            await this.browser.findButtonAndClick("Next")

            // Enter password
            await this.browser.waitForElement("css", 'input[type="password"]')
            // await this.browser.driver.sleep(10000)
            let passwordInput = await this.browser.getElement("css", 'input[type="password"]')
            passwordInput.sendKeys(password)
            await this.browser.driver.sleep(3000)
            await this.browser.findButtonAndClick("Log in")

            await this.browser.waitForElement("css", '[aria-label="Tweet"]')

            let tweetButton = await this.browser.getElement("css", '[aria-label="Tweet"]')

            if (tweetButton){
                console.log("Login success")
                return true
            }else{
                console.log("Login failed")
                return false
            }
        }catch(e){
            console.log(e)
        }

    }

}