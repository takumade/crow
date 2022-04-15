import { WebDriver, WebElement } from "selenium-webdriver"
import { waitForElTimeout } from "../../constants"
import { Browser } from "./browser"

class Tweet{

    driver:WebDriver
    tweetUrl:string
    onTweetPage:boolean
    browser:Browser

    constructor(driver: WebDriver, tweetUrl:string){
        this.driver = driver
        this.tweetUrl = tweetUrl
        this.onTweetPage = false

        this.browser = new Browser(this.driver)
    }

    async getToTweet(){
        if(!this.onTweetPage){
           await this.browser.goToPage(this.tweetUrl, "css", "[data-testid='tweet']", waitForElTimeout)
           this.onTweetPage = true
        }
    }

    async like(){
        await this.getToTweet()
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='like']")[0].click()`)
    }

    async unlike(){
        await this.getToTweet()
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='unlike']")[0].click()`)
    }

    async retweet(){
        await this.getToTweet()
        console.log("[i] Retweeting tweet "+this.tweetUrl)
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='retweet']")[0].click()`)
        this.driver.sleep(2000)
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='retweetConfirm']")[0].click()`)
    }

    async unretweet(){
        await this.getToTweet()
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='unretweet']")[0].click()`)
        this.driver.sleep(2000)
        await this.driver.executeScript(`document.querySelectorAll("[data-testid='unretweetConfirm']")[0].click()`)     
    }

    async reply(message:string){
        await this.getToTweet()
        await this.browser.waitForElement("css", "[data-testid='tweetTextarea_0']")
        await this.browser.sendKeys("css", "[data-testid='tweetTextarea_0']", message, 1 , 2)
        let tweetButton = await this.browser.getElement("css", "[data-testid='tweetButtonInline']")
        tweetButton.click()
    }

    async delete(){
        await this.getToTweet()
         
        let carets:WebElement[] = await this.browser.getElements("css", "[data-testid='caret']")

     for (const caret of carets) {
        caret.click()

        await this.driver.sleep(2000)
       
        await this.driver.executeScript(`let menuItems =  document.querySelectorAll("[role='menuitem']")

        for (const menuItem of menuItems) {
            let menuItemText = menuItem.innerText
            menuItemText = menuItemText.toLowerCase()

            if (menuItemText == "delete"){
                menuItem.click()
                document.querySelector("[data-testid='confirmationSheetConfirm']").click()
            }
        }`)
     }
    }
}

export default Tweet;