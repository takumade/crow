import { WebDriver } from "selenium-webdriver";
import { waitForElTimeout } from "../../constants";
import { Browser } from "./browser";

class User {

    driver: WebDriver
    username: string
    onUserPage:boolean
    browser: Browser;

    constructor(driver:WebDriver, username: string){
        this.driver = driver
        this.username = username

        this.browser = new Browser(this.driver)
    }

    async getToUser(){
        if(!this.onUserPage){
            await this.browser.goToPage(
                "https://twitter.com/" + this.username, 
                "css", 
                "[alt='Opens profile photo']", 
                waitForElTimeout
            )

            this.onUserPage = true
         }
    }

    async getUserInfo(){

        try{

            await this.getToUser()
            await this.browser.sleepDefault()


            let scrapUserScript = `
                let userNameRaw = document.querySelector('[data-testid="UserName"]')
                                  .innerText.split(String.fromCharCode(0x0a))

                const processNum = (n) => {
                    if (n.includes("K")){
                        n = n.replace("K").replace(",", "")
                        n = parseFloat(n) * 1000
                        return n
                    }

                    if (n.includes("M")){
                        n = n.replace("K").replace(",", "")
                        n = parseFloat(n) * 100000
                        return n
                    }

                    return parseFloat(n.replace(",", ""))

               
                }

                let displayname = userNameRaw[0]
                let userName = userNameRaw[1]
                let bio = document.querySelector('[data-testid="UserDescription"]')?.innerText
                let location = document.querySelector('[data-testid="UserLocation"]')?.innerText
                let url = window.location.href
                let professionalCategory = document.querySelector('[data-testid="UserProfessionalCategory"]')?.innerText
                let following = document.querySelector('[href="/${this.username}/following"]')?.innerText.split(" ")[0]
                let followers = document.querySelector('[href="/${this.username}/followers"]')?.innerText.split(" ")[0]
                let photo = document.querySelector('[alt="Opens profile photo"]')?.src

            



                let userDetails = {
                    displayname,
                    userName,
                    bio,
                    location,
                    url,
                    professionalCategory,
                    following: processNum(following),
                    followers: processNum(followers),
                    photo
                }

                return userDetails`

            let result = await this.browser.syncExecuteJS(scrapUserScript)
            return result
        }catch (e){
            console.log(e)
        }
    }

    async getFollowers(limit: number){

        await this.browser.goToPage(
            `https://twitter.com/${this.username}/followers`, 
            "css",
            "[data-testid='UserCell']"
        )

        let finalFollowing = []

        

        while(finalFollowing.length < limit){
            // Scrape followers
            try{
                
                let scrappedFollowing = await this.browser.syncExecuteJS(`
                let final = [];
                let followers = document.querySelectorAll("[data-testid='UserCell']");
                for (let index = 0; index < followers.length; index++) {
                    const userRaw = followers[index];

                    // let displayName = userRaw.innerText.split("@")[0].trim()
                    let userName = userRaw.querySelector("a").href.split("/")[3]
                    final.push(userName)  
                }
                
                    return final`
                )

                finalFollowing = Array.from(new Set(finalFollowing.concat(scrappedFollowing)))

                // Scroll page 
                await this.browser.scrollPage()

                await this.browser.waitForElement("css", "[data-testid='UserCell']")
            
            }catch(e){
                console.log(e)
                break
            }
        }

        return finalFollowing

    }

    async getFollowing(limit:number){

        // go to page
        await this.browser.goToPage(
            `https://twitter.com/${this.username}/following`, 
            "css",
            "[data-testid='UserCell']"
        )

        let finalFollowing = []

        

        while(finalFollowing.length < limit){
            // Scrape followers
            try{
                
                let scrappedFollowing = await this.browser.syncExecuteJS(`
                let final = [];
                let followers = document.querySelectorAll("[data-testid='UserCell']");
                for (let index = 0; index < followers.length; index++) {
                    const userRaw = followers[index];

                    // let displayName = userRaw.innerText.split("@")[0].trim()
                    let userName = userRaw.querySelector("a").href.split("/")[3]
                    final.push(userName)  
                }
                
                    return final`
                )

                finalFollowing = Array.from(new Set(finalFollowing.concat(scrappedFollowing)))

                // Scroll page 
                await this.browser.scrollPage()

                await this.browser.waitForElement("css", "[data-testid='UserCell']")

                await this.browser.sleep(1000, 2000)

                if (await this.browser.finishedScrolling(97)){
                    break
                }      
            
            }catch(e){
                console.log(e)
                break
            }
        }

        return finalFollowing
    }

    async unfollow(){
        await this.getToUser()
        await this.browser.sleepDefault()

        let unfollowButton = await this.browser.syncExecuteJS(`return document.querySelector("[data-testid$='-unfollow']")`)

        if (unfollowButton){
            await this.browser.syncExecuteJS(`document.querySelector("[data-testid$='-unfollow']").click()`)
        await this.browser.sleepDefault()
        await this.browser.syncExecuteJS(`document.querySelector("[data-testid='confirmationSheetConfirm']").click()`)
        }
    }

    async follow(){
        await this.getToUser()
        await this.browser.sleepDefault()

        let followButton = await this.browser.syncExecuteJS(`return document.querySelector("[data-testid$='-follow']")`)

        if (followButton){
            await this.browser.syncExecuteJS(`document.querySelector("[data-testid$='-follow']").click()`)
            await this.browser.sleepDefault()
        }
    }
}

export default User