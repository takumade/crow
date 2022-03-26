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
            console.log(await client.scrapUser("Tinashe_Maburu"))
            console.log(await client.scrapUser("cypd_"))
            console.log(await client.scrapUser("RealTalkFadzie"))
            console.log(await client.scrapUser("Bybit_Official"))
        })



    }
).catch(console.log)
