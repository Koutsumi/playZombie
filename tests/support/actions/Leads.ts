import { expect, Page } from "@playwright/test";

export class Leads{
    page: Page;
    constructor(page: Page){
        this.page = page
    }

    async visit(){
        await this.page.goto("/");
    }

    async openLeadModal(){
        await this.page.getByRole("button", { name: /Aperte o play/ }).click();
        await expect(
          this.page.getByTestId("modal").getByRole("heading"))
          .toHaveText("Fila de espera"
        );
    }

    async submitLeadForm(name, email){
        await this.page.locator("input#name").fill(name);
        //await page.getByPlaceholder('Seu nome completo').fill('Fernanda Baccarini');
        await this.page.locator("input#email").fill(email);
        await this.page.getByTestId("modal").getByText(/Quero entrar na fila/).click();
    }

    async alertHaveText(text){
        await expect(this.page.locator('span.alert')).toHaveText(text)
    }
}