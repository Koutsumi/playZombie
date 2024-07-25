import { expect, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    constructor(page){
        this.page = page
    }

    async visit(){
        await this.page.goto("http://localhost:3000/admin/login");
        const loginForm = this.page.locator('div.login-form');
        await expect(loginForm).toBeVisible();
    }

    async submit(email, password){
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByText('Entrar').click();
    }

}