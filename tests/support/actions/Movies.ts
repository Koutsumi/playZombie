import { expect, Page } from "@playwright/test";

export class Movies{
    page: Page;
    constructor(page: Page){
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href$="/movies/register"]').click();
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }

    async search(target, moviesOutput){
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target);

        await this.page.locator('.actions button')
                .click();   

        await this.tableHave(moviesOutput);
    }

    async tableHave(moviesOutput){
        const rows = await this.page.getByRole('row');
        await expect(rows).toContainText(moviesOutput);
    }

    async remove(movie){
        // xpath = //td[text()="${movie}"]/..//button
        await this.page.getByRole('row', {name: movie.title})
            .getByRole('button').click();
        await this.page.click('.confirm-removal');
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

        await this.page.locator('input[name="cover"]')
            .setInputFiles(`tests/support/fixtures/${data.cover}`)
        //console.log(await this.page.content())

        if(data.feature){
            await this.page.locator('label.feature .dev.react-switch')
                .click()
        }

        await this.submit();
       
    }
}