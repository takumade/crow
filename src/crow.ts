import { TwitterClient } from "../src/classes/twitter_client"
import User from "./classes/user"

const start = async () => {
    // Init the browser 


    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()
        
        if(result){
           // Do your stuff here
           let user = new User(client.driver, "UnitedQueenMi")
           let info = await user.getUserInfo()
           console.log(info)
        }

    }catch(e){
        console.log(e)
    }
}

start()