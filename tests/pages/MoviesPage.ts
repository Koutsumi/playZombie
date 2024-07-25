import { expect, Page } from "@playwright/test";

export class MoviesPage{
    page: Page;
    constructor(page){
        this.page = page
    }

    async isLoggedIn(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*admin/)
    }
}