
import { Browser } from './browser'

export class TwitterClient{

    browser: Browser

    constructor(browser: Browser){
        this.browser = browser
    }

    async login(username: string, password: string){
        try{

            await this.browser.goToPage(
                "https://twitter.com/i/flow/login",
                "css",
                "[autocomplete='username']")

            // Enter username 
            await this.browser.sendKeys("css", "[autocomplete='username']", username, 0,0)
            await this.browser.driver.sleep(this.browser.randomInt(1,2))
            await this.browser.findButtonAndClick("Next")

            // Enter password
            await this.browser.waitForElement("css", 'input[type="password"]')
            // await this.browser.driver.sleep(10000)
            await this.browser.sendKeys("css", 'input[type="password"]', password, 0,0)
            await this.browser.driver.sleep(this.browser.randomInt(1,3))
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

    async getTrends(){
        try{
            await this.browser.goToPage(
                "https://twitter.com/i/trends",
                "css",
                '[aria-label="Timeline: Trends"]')


            await this.browser.waitForElement("css", "[data-testid='trend']")

            // Scroll to the very bottom of the page
            let start = 1000
            let countChanged = true

            while (true){
                let currentEls = await this.browser.getElements("css", "[data-testid='trend']")
                await this.browser.syncExecuteJS(`window.scrollBy(0, ${start})`)
                await this.browser.driver.sleep(2000)
                let newEls = await this.browser.getElements("css", "[data-testid='trend']")

                if (newEls.length == currentEls.length){
                    break
                }else{
                    start *= 2
                }
            }
            
            
            // Scrape all trends
            let trendsScript = `let rawTrends = document.querySelectorAll('[data-testid="trend"]');
            let allTrends = [];

            for (let i = 0; i < rawTrends.length; i++){
                let t = rawTrends[i]
               let tList = t.innerText.split(String.fromCharCode(0x0A))
                allTrends.push({
                    details: tList[0],
                    name: tList[1],
                    tweets: tList[2]
                })
            }

            console.log(allTrends)

            return allTrends;`


            let trendsList =  await this.browser.syncExecuteJS(trendsScript)
            return trendsList


        }catch(e){
            console.log(e)
        }
    }

    async tweet(tweet: string){
        try {
            let tweetElement = await this.browser.getElement("css", '[aria-label="Tweet"]')
            tweetElement.click()

            await this.browser.waitForElement("css", "[data-testid='tweetTextarea_0']")
            await this.browser.sendKeys("css", "[data-testid='tweetTextarea_0']", tweet, 1 , 2)
            await this.browser.driver.sleep(this.browser.randomInt(1,3))
            let tweetButton = await this.browser.getElement("css", "[data-testid='tweetButton']")
            tweetButton.click()

        }catch(e){
            console.log(e)
        }
    }

    async scrapUser(username:string){

        try{
            await this.browser.goToPage(
                "https://twitter.com/" + username,
                "css",
                '[alt="Opens profile photo"]')


            await this.browser.driver.sleep(this.browser.randomInt(1,5))


            let scrapUserScript = `
                let userNameRaw = document.querySelector('[data-testid="UserName"]')
                                  .innerText.split(String.fromCharCode(0x0a))

                let displayname = userNameRaw[0]
                let userName = userNameRaw[1]
                let bio = document.querySelector('[data-testid="UserDescription"]')?.innerText
                let location = document.querySelector('[data-testid="UserLocation"]')?.innerText
                let url = document.querySelector('[data-testid="UserUrl"]')?.innerText
                let professionalCategory = document.querySelector('[data-testid="UserProfessionalCategory"]')?.innerText
                let following = document.querySelector('[href="/${username}/following"]')?.innerText
                let followers = document.querySelector('[href="/${username}/followers"]')?.innerText
                let photo = document.querySelector('[alt="Opens profile photo"]')?.src

                let userDetails = {
                    displayname,
                    userName,
                    bio,
                    location,
                    url,
                    professionalCategory,
                    following,
                    followers,
                    photo
                }

                return userDetails`

            let result = await this.browser.syncExecuteJS(scrapUserScript)
            return result
        }catch (e){
            console.log(e)
        }
    }

}