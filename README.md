# Crow - An unofficial Twitter client

<p style="text-align:center;">
<img style="background: #1DA1F2; border: 3px solid #fcf7e2; border-radius: 50%" src="./images/crow.png" width="200" height="200" alt="Crow Logo">
</p>


## Whats Crow
<hr>

![Crow](./images/usecase.jpg)

Is an unofficial Twitter client written in node js. It works with selenium and twitter. With that said i am not reponsible if you get suspended from twitter. Be a good netizen and follow the rules.

## How to Install
1. Clone the project

        git clone https://github.com/takumade/crow.git

2. Install node modules

        cd crow && npm install

3. Do some coding and play
        npm run start

## Important

Before you can you can do anything you need to first get a twitter client. A twitter client is a logged in user

1. Add your creds in `constants.ts`
```js
export const username = "username"
export const password = "password"
```

2. Now obtain a client and fetch tweets

```js
import { TwitterClient } from "./classes/twitter_client"

const getTweets = async () =>  {
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
```

## Examples

**1. Get the current trends**

```js
// Get Twitter client first
let trends = await client.getTrends()        
```

**2. Tweet something**
```js
// Get Twitter client first
await client.tweet("Hello World! how are you");
```

**3. Like, Retweet and Reply a tweet**
```js

import { Tweet } from "./classes/tweet"
...
// get client first 
let tweet = new Tweet(client.driver, <tweetUrl>)
await tweet.like()
await tweet.retweet()
await tweet.reply("Sounds Awesome!")
```

**4. Get user info**

```js
import User from "./classes/user"
...
//get client first
let user = new User(client.driver, <username>)
let info = await user.getUserInfo()
```

## Classes

`TwitterClient`

:: Deals mainly with logging you in and doing general stuff like getting tweets, trends

`Tweet`

:: Deals with a single tweet

`User`

:: Deals with a tweeter user


`Browser`

:: Has helper functions 






## Features

| Feature   |     Done      |  Is Working |
|----------|:-------------:|------:|
| Auth |  :ballot_box_with_check:| :ballot_box_with_check: |
| Get User |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Get Tweet |    :ballot_box_with_check:  |   :ballot_box_with_check:|
| Get Trending |   :ballot_box_with_check:  |   :ballot_box_with_check: |
| Get Tweets |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Reply to a tweet |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Tweet a text message |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Like a tweet |    :ballot_box_with_check:  |   :ballot_box_with_check: |
| Delete a tweet |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Login with cookies |    :ballot_box_with_check:  |   :ballot_box_with_check: |
| Turn it into a package |    :ballot_box_with_check:   |   :ballot_box_with_check: |
    
## Buy me a coffee

https://wa.me/263778548832?text="Hey%20I%20want%20to%20buy%20you%20a%20coffee"