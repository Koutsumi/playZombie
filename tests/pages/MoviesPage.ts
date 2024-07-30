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

    async create(data){
        await this.page.locator('a[href$="/movies/register"]').click();
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

        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }
}