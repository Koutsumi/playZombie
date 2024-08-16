import { expect, Page } from "@playwright/test";

export class Login{
    page: Page;
    constructor(page: Page){
        this.page = page
    }

    async do(username, email, password){
        await this.visit();
        await this.submit(email, password);
        await this.isLoggedIn(username);
    }

    async visit(){
        await this.page.goto("/admin/login");
        const loginForm = this.page.locator('div.login-form');
        await expect(loginForm).toBeVisible();
    }

    async submit(email, password){
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByText('Entrar').click();
    }

    async isLoggedIn(username){
        await this.page.waitForLoadState('networkidle');
        const loggedUser = await this.page.locator('.logged-user');
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
        await expect(this.page).toHaveURL(/.*admin/);
    }
}