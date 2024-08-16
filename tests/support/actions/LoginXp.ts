import { expect, Locator, Page } from "@playwright/test";

export interface Account {
    username: string
    password: string
}

export class LogiXp{
    page: Page;
    constructor(page: Page){
        this.page = page
    }

    async submit(account: Account){
        await this.page.goto('https://loginxp.vercel.app/');
        await this.page.getByPlaceholder('nome de usuário').fill(account.username);
        await this.page.getByPlaceholder('senha secreta').fill(account.password);
        await this.page.getByRole('button', { name: 'Entrar' }).click();
    }

    async getPopupContent() : Promise<Locator>{
        return this.page.locator('#swal2-html-container');
    }

    async assertToast(text:string){
        const toasterContent = this.page.getByRole('status');
        await toasterContent.screenshot();
        await expect(toasterContent).toContainText(text);
    }
}