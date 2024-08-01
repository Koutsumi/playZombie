import { test } from "../support";
import dataMovies from "../support/fixtures/movies.json";
import { executeSQL } from "../support/database";

test.beforeAll(async () => {
    await executeSQL(`DELETE from movies WHERE title = '${dataMovies.guerra_mundial_z.title}'`)
})

test.beforeEach(async ({page}) => {
    await page.login.do("Admin","admin@zombieplus.com", "pwd123");
})

test("Deve poder cadastar um novo filme", async function({page}){
    await page.movies.create(dataMovies.guerra_mundial_z);
    await page.toast.containText(/Cadastro realizado com sucesso/);
})

test("Não deve cadastrar quando os campos obrigatórios não são prrenchidos", async function({page}){
    await page.movies.goForm();
    await page.movies.submit();
    await page.alert.haveText([
        /Por favor, informe o título/, 
        /Por favor, informe a sinopse/, 
        /Por favor, informe a empresa distribuidora/, 
        /Por favor, informe o ano de lançamento/
    ])
})