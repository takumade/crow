let username:string = "saibot222"
let password:string = "67595911[n00b]"


import { TwitterClient } from "./classes/twitter_client"
import { Browser } from "./classes/browser"



let browser = new Browser().init().then(
    (browser) => {

        console.log("The browser is ready: ", browser)
        let client = new TwitterClient(browser)
        client.login(username, password).then(async (result) => {
            console.log("Login result: ", result)
            let tweets = await client.fetchTweets("https://twitter.com/home", 10)
            console.log("Tweets: ", tweets)

        })



    }
).catch(console.log)
