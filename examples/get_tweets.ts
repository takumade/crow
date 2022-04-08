import { TwitterClient } from "../src/classes/twitter_client"
import { Browser } from "../src/classes/browser"



const getTweets = async () => {
    // Init the browser 


    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()

       

        if(result){
           // Do your stuff here
           let tweets = await client.fetchTweets("https://twitter.com/home", 10)
            console.log("Tweets: ", tweets)
        }

    }catch(e){
        console.log(e)
    }
}

getTweets()