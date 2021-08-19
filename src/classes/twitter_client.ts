
import { Browser } from './browser'
import {TrendItem } from './general_classes'

export class TwitterClient{
    username: string
    password: string
    browser: Browser

    constructor(username: string, password: string){
        this.username = username
        this.password = password
    }

    async login(){
        let browser = new Browser()
        await browser.goToPage("https://twitter.com/login", "[name='session[username_or_email]']")
        await browser.enterInput("[name='session[username_or_email]']", this.username, 200)
        await browser.enterInput("[name='session[password]']", this.password, 200)
        await browser.clickSelector("[data-testid='LoginForm_Login_Button']")
        this.browser = browser
        return browser

    }

    async getTrends(timeout: number = 5000){
        let final_trends = []
        let current_page = this.browser.getCurrentPage()
        await current_page.waitForSelector("[data-testid='AppTabBar_Explore_Link']")
        await this.browser.clickSelector("[data-testid='AppTabBar_Explore_Link']")
        
        await current_page.waitForSelector("[href='/i/trends']")
        await this.browser.clickSelector("[href='/i/trends']")

        await current_page.waitForSelector("[data-testid='trend']")
        await current_page.waitForTimeout(timeout)

        // Get the trends
        let all_trends = await current_page.evaluate(() => {
            let filtered_trends = []
            let trends = document.querySelectorAll("[data-testid='trend']")
            for(let i = 0; i < trends.length; i++){
                let trend = trends[i]
                let span = trend.querySelectorAll("span")

                try{
                    filtered_trends.push({
                        trending_text: span[0].innerText,
                        name: span[1].innerText,
                        tweets: span[2].innerText
                    })
                }catch(e){
                    console.log(e)
                }

            }

            return filtered_trends
        });

        

        for( let i = 0; i < all_trends.length; i++){
            let trend = all_trends[i]
            let trend_item = new TrendItem(trend.trending_text, trend.name, trend.tweets)
            final_trends.push(trend_item)
        }

        return final_trends
    }
}