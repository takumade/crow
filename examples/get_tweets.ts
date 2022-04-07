import { TwitterClient } from "../src/classes/twitter_client"
import { Browser } from "../src/classes/browser"



const getTweets = async () => {
    // Init the browser 
    try{
        let browser = new Browser()
        await browser.init()
            
        console.log("The browser is ready: ", browser)
        
        let client = new TwitterClient(browser)
        let loginResult = await client.login()

        if(loginResult){
            // Do your stuff here
            let tweets = await client.fetchTweets("https://twitter.com/home", 10)
            console.log("Tweets: ", tweets)
        }

    }catch(e){
        console.log(e)
    }
}

getTweets()