const puppeteer = require('puppeteer');

export class Browser {

    browser
    page

    async getBrowser(){
        this.browser = await puppeteer.launch({ headless: false });
    }

    async goToPage(url:string, waitForSelector:string = undefined){
        await this.getBrowser()
        this.page = await this.browser.newPage();
        await this.page.goto(url);

        if (waitForSelector != null){
            await this.page.waitForSelector(waitForSelector)
        }
    }

    async goToUrlSamePage(url:string, waitForSelector:string = undefined){
        await this.page.goto(url);
        if (waitForSelector != null){
            await this.page.waitForSelector(waitForSelector)
        }
    }

    getCurrentPage(){
        return this.page;
    }

    

   async enterInput(selector:string, text:string, delay:number = 100){
        await this.page.type(selector, text, { delay: delay });
    }

   async clickSelector(selector:string){
        await this.page.click(selector)
   }

        



}