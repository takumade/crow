
import { TwitterClient } from "../src/classes/twitter_client"
import { Browser } from "../src/classes/browser"

const getTrends = async () => {
    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()

       

        if(result){
           // Do your stuff here
           let trends = await client.getTrends()
           console.log("Trends: ", trends)
        }

    }catch(e){
        console.log(e)
    }
}


getTrends()
