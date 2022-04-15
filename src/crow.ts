import { TwitterClient } from "../src/classes/crow/twitter_client"
import User from "./classes/crow/user"

const start = async () => {
    // Init the browser 


    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()
        
        if(result){
           // Do your stuff here

           let following = new User(client.driver, "Axecure_sneaker")
           following.follow()
           
           
        }

    }catch(e){
        console.log(e)
    }
}

start()