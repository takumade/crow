import { WebDriver } from "selenium-webdriver";
import { waitForElTimeout } from "../constants";
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

                let displayname = userNameRaw[0]
                let userName = userNameRaw[1]
                let bio = document.querySelector('[data-testid="UserDescription"]')?.innerText
                let location = document.querySelector('[data-testid="UserLocation"]')?.innerText
                let url = window.location.href
                let professionalCategory = document.querySelector('[data-testid="UserProfessionalCategory"]')?.innerText
                let following = document.querySelector('[href="/${this.username}/following"]')?.innerText
                let followers = document.querySelector('[href="/${this.username}/followers"]')?.innerText
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

export default User