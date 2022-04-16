import { TwitterClient } from "../src/classes/crow/twitter_client"
import User from "../src/classes/crow/user"

const start = async () => {
    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()
        
        if(result){
           // Do your stuff here

            let user = new User(client.driver, "takucoder")
            let unfollowUsers = await user.getFollowing(326)

            for (let index = 0; index < unfollowUsers.length; index++) {
                const user = unfollowUsers[index];
                let currUser = new User(client.driver, user)
                await currUser.unfollow()
                console.log(currUser)
            }

        }

    }catch(e){
        console.log(e)
    }
}

start()