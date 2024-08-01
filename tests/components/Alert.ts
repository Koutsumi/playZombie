import { expect, Page } from "@playwright/test";

export class AlertComponent{
    page: Page;
    constructor(page){
        this.page = page
    }
    
    async haveText(text){
        const toast = this.page.locator('span[class$="alert"]')
        await expect(toast).toHaveText(text);
    }
}
