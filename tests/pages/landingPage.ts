import { expect } from "@playwright/test";

export class LandingPage{
    page: any;
    constructor(page){
        this.page = page
    }

    async visit(){
        await this.page.goto("http://localhost:3000");
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

    async toastHaveText(text){
        const toast = this.page.locator('div.toast')
        await expect(toast).toHaveText(text);
        await expect(toast).toBeHidden({timeout: 5000});
        
        // * Para conseguir pegar um elemento que some da tela
        // await page.getByText('seus dados conosco').click();
        // const content = await page.content();
        // console.log(content)
    }
}