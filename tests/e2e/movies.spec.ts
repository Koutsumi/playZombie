import { expect, test } from "../support";
import dataMovies from "../support/fixtures/movies.json";
import { executeSQL } from "../support/database";
import { describe } from "node:test";
describe("Cadastro de filmes", async function(){
    test.beforeAll(async () => {
        await executeSQL(`DELETE from movies`)
    })
    
    test("Deve poder cadastar um novo filme", async function({page}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.movies.create(dataMovies.create);
        await page.popup.haveText(`O filme '${dataMovies.create.title}' foi adicionado ao catálogo.`);
    });

    test("Deve poder remover um filme", async function({page, request}){
        const movie = dataMovies.to_remove;
        await request.api.postMovie(movie);
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.movies.remove(movie);
        await page.popup.haveText(/Filme removido com sucesso./);
    });

    test("Não deve cadastar quando o título é duplicado", async function({page, request}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        const movie = dataMovies.duplicate
        await request.api.postMovie(movie);
        await page.movies.create(movie);
        await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
    });
    
    test("Não deve cadastrar quando os campos obrigatórios não são prrenchidos", async function({page}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.movies.goForm();
        await page.movies.submit();
        await page.alert.haveText([
            /Campo obrigatório/,
            /Campo obrigatório/,
            /Campo obrigatório/,
            /Campo obrigatório/
        ])
    });

    test("Deve realizar busca pelo termo zumbi", async function({page, request}){
        const movies = dataMovies.search;

        movies.data.forEach(async movie => {
            await request.api.postMovie(movie);
        });

        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.movies.search(movies.input, movies.output);
    });
})
