
import { Browser } from './browser'

export class TwitterClient{
    username: string
    password: string

    constructor(username: string, password: string){
        this.username = username
        this.password = password
    }

    async login(){
        let browser = new Browser()
        await browser.goToPage("https://twitter.com/login", "[name='session[username_or_email]']")
        await browser.enterInput("[name='session[username_or_email]']", this.username, 200)
        await browser.enterInput("[name='session[password]']", this.password, 200)
        await browser.clickSelector("[data-testid='LoginForm_Login_Button']")
    
    }



}