
import { TwitterClient } from "./classes/twitter_client"
import { Browser } from "./classes/browser"

const start = async () => {
    // Init the browser 
    try{
        let browser = new Browser()
        await browser.init()
            
        console.log("The browser is ready: ", browser)
        
        let client = new TwitterClient(browser)
        let loginResult = await client.login()

        if(loginResult){
            // Do your stuff here
           

            
        }

    }catch(e){
        console.log(e)
    }
}


start()