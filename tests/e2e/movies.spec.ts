import { test } from "../support";
import dataMovies from "../support/fixtures/movies.json";
import { executeSQL } from "../support/database";


test.beforeEach(async ({page}) => {
    await executeSQL(`DELETE from movies WHERE title = '${dataMovies.guerra_mundial_z.title}'`)
})

test("Deve poder cadastar um novo filme", async function({page}){
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "pwd123");
    await page.movies.isLoggedIn();
    await page.movies.create(dataMovies.guerra_mundial_z);
    await page.toast.containText(/Cadastro realizado com sucesso/)
})