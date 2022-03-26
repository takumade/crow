import { Builder, By, Key, until } from 'selenium-webdriver';

export class Browser {

    driver
    page

    async init(){
        this.driver = await new Builder().forBrowser('chrome').build();
        return this
    }

    async getDriver(){  
        return this.driver;
    }



    async goToPage(url:string, waitby:string = "", waitarg:string = ""){
        await this.driver.get(url)

        if(waitby != ""){
            if (waitby == "css"){
                await this.driver.wait(until.elementLocated(By.css(waitarg)), 10000)
            }
        }
        
    }

    async getElement(by:string, arg:string){
        if (by == "css"){
            return await this.driver.findElement(By.css(arg))
        }
    }

    async getElements(by:string, arg:string){
        if (by == "css"){
            return await this.driver.findElements(By.css(arg))
        }
    }

    async findButtonAndClick(buttonText:string){
        let script = `let buttons = document.querySelectorAll("[role='button']")
        for (let index = 0; index < buttons.length; index++) {
            const element = buttons[index];
            if (element.innerText == "${buttonText}"){
                element.click()
                break
            }
        }`

        await this.driver.executeScript(script)
    }

    async waitForElement(waitby:string, waitarg:string, timeout:number = 10000){
        if (waitby == "css"){
            await this.driver.wait(until.elementLocated(By.css(waitarg)), timeout)
        }
    }

    async syncExecuteJS (script:string){
        return await this.driver.executeScript(script)
    }

    getCurrentPage(){
        return this.page;
    }

    


  

        



}