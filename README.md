# Blackbird

<img src="./images/logo.png" width="200" alt="Blackbird Logo">

An unofficial Twitter client in node js.

## Whats blackbird

![Blackbird](./images/usecase.jpg)

Is an unofficial Twitter client in node js. It works with selenium and twitter. With that said i am not reponsible if you get suspended from twitter. Be a good netizen and follow the rules.

## How to Install
1. Clone the project

        git clone https://github.com/takumade/blackbird.git

2. Install node modules

        npm install

3. Play

## Examples

Before you can run the examples you need to create a twitter client and then log in with it:

```js
import { TwitterClient } from "./classes/twitter_client";

let twitterClient = new TwitterClient(
    "<username>",
    "<password>"
);

twitterClient.login().then(() => {
        // do your stuff here
})
```

**1. Get the current trends**

```js
let trends = await twitterClient.getTrends()        
```

This will return a list of `TrendItem` objects.

**2. Tweet something**
```js
await twitterClient.tweet("Hello World! how are you");
```

## Features

| Feature   |     Done      |  Is Working |
|----------|:-------------:|------:|
| Auth |  :ballot_box_with_check:| :ballot_box_with_check: |
| Get User |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Get Tweet |    :x:   |   :x: |
| Get Trending |   :ballot_box_with_check:  |   :ballot_box_with_check: |
| Get Tweets |    :x:   |   :x: |
| Reply to a tweet |    :x:   |   :x: |
| Tweet a text message |    :ballot_box_with_check:   |   :ballot_box_with_check: |
| Like a tweet |    :x:   |   :x: |
| Delete a tweet |    :x:   |   :x: |
    
## Buy me a coffee

   <a href="https://www.buymeacoffee.com/takumade" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>