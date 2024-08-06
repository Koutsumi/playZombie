import { expect, test } from "../support";
import dataMovies from "../support/fixtures/movies.json";
import { executeSQL } from "../support/database";
import { describe } from "node:test";
describe("Cadastro de filmes", async function(){
    test.beforeAll(async () => {
        await executeSQL(`DELETE from movies`)
    })
    
    test.beforeEach(async ({page}) => {
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
    })
    
    test("Deve poder cadastar um novo filme", async function({page}){
        await page.movies.create(dataMovies.create);
        await page.toast.containText(/Cadastro realizado com sucesso/);
    });

    test("Não deve cadastar quando o título é duplicado", async function({page, request}){
        const movie = dataMovies.duplicate
        await request.api.postMovie(movie);
        await page.movies.create(movie);
        await page.toast.containText(/Este conteúdo já encontra-se cadastrado no catálogo/);
    });
    
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
})
