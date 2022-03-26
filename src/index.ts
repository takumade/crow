let username:string = "saibot222"
let password:string = "67595911[n00b]"


import { TwitterClient } from "./classes/twitter_client"
import { Browser } from "./classes/browser"



let browser = new Browser().init().then(
    (browser) => {

        console.log("The browser is ready: ", browser)
        let client = new TwitterClient(browser)
        client.login(username, password).then(result => {
            console.log("Login result: ", result)
            client.getTrends().then(trends => {
                console.log("Trends: ", trends)
            })
        })



    }
).catch(console.log)
