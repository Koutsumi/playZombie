import { expect, Page } from "@playwright/test";

export class Movies{
    page: Page;
    constructor(page){
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href$="/movies/register"]').click();
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }

    async create(data){
        await this.goForm()
        await this.page.getByLabel(/Titulo do filme/).fill(data.title);
        await this.page.getByLabel('Sinopse').fill(data.overview);

        await this.page.locator('#select_company_id .react-select__indicator')
            .click();
        await this.page.locator('.react-select__option')
            .filter({hasText:data.company})
                .click();

        await this.page.locator('#select_year .react-select__indicator')
            .click();
        await this.page.locator('.react-select__option')
            .filter({hasText:data.release_year})
                .click();
        //console.log(await this.page.content())

        await this.submit();
       
    }
}