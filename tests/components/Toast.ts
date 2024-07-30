import { expect, Page } from "@playwright/test";

export class ToastComponent{
    page: Page;
    constructor(page){
        this.page = page
    }
    
    async containText(text){
        const toast = this.page.locator('div.toast')
        await expect(toast).toContainText(text);
        //await expect(toast).toBeHidden({timeout: 5000});
        
        // * Para conseguir pegar um elemento que some da tela
        // await page.getByText('seus dados conosco').click();
        // const content = await page.content();
        // console.log(content)
    }
}
