# Blackbird
### Codename: Raven

<img src="./images/logo.png" width="200" alt="Blackbird Logo">

An unofficial Twitter client in node js.

## Whats blackbird

![Blackbird](./images/usecase.jpg)

Is an unofficial Twitter client written in node js. It works with selenium and twitter. With that said i am not reponsible if you get suspended from twitter. Be a good netizen and follow the rules.

## How to Install
1. Clone the project

        git clone https://github.com/takumade/blackbird.git

2. Install node modules

        npm install

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
import { Browser } from "./classes/browser"

try{
     let browser = new Browser()
     await browser.init()
            
     console.log("The browser is ready: ", browser)
        
     let client = new TwitterClient(browser)
     let loginResult = await client.login()

     if(loginResult){
         // Do your stuff here
         let tweets = await client.fetchTweets("https://twitter.com/home", 10)
         console.log("Tweets: ", tweets)
     }

}catch(e){
     console.log(e)
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


## Features

| Feature   |     Done      |  Is Working |
|----------|:-------------:|------:|
| Auth |  :ballot_box_with_check:| :ballot_box_with_check: |
| Get User |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Get Tweet |    :x:   |   :x: |
| Get Trending |   :ballot_box_with_check:  |   :ballot_box_with_check: |
| Get Tweets |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Reply to a tweet |    :x:   |   :x: |
| Tweet a text message |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Like a tweet |    :x:   |   :x: |
| Delete a tweet |    :x:   |   :x: |
| Turn it into a package |    :x:   |   :x: |
    
## Buy me a coffee

https://wa.me/263778548832?text="Hey%20I%20want%20to%20buy%20you%20a%20coffee"