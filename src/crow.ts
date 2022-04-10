

const start = async () => {
    // Init the browser 
    try{

        let client = new TwitterClient()
        let result = await client.getClient()

       

        if(result){
           // Do your stuff here


           let deleteTWeet = new Tweet(client.driver, "https://twitter.com/saibot222/status/1513087981967618050")
           await deleteTWeet.delete()
           
            
        }

    }catch(e){
        console.log(e)
    }
}


start()