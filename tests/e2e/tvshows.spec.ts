import { expect, test } from "../support";
import dataTvshow from "../support/fixtures/tvshow.json";
import { executeSQL } from "../support/database";
import { describe } from "node:test";

describe("Cadastro de séries", function(){
    test.beforeAll(async () => {
        await executeSQL(`DELETE from tvshows`)
    });

    test("Deve poder cadastar uma nova série", async function({page}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.tvshows.create(dataTvshow.create);
        await page.popup.haveText(`A série '${dataTvshow.create.title}' foi adicionada ao catálogo.`);
    });

    test("Deve poder remover um filme", async function({page, request}){
        const tvshow = dataTvshow.to_remove;
        await request.api.postTvshow(tvshow);
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.tvshows.visit();
        await page.tvshows.remove(tvshow);
        await page.popup.haveText(/Série removida com sucesso./);
    });

    test("Não deve cadastar quando o título é duplicado", async function({page, request}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        const tvshow = dataTvshow.duplicate;
        await request.api.postTvshow(tvshow);
        await page.tvshows.create(tvshow);
        await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
    });

    test("Não deve cadastrar quando os campos obrigatórios não são prrenchidos", async function({page}){
        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.tvshows.visit();
        await page.tvshows.goForm();
        await page.tvshows.submit();
        await page.alert.haveText([
            /Campo obrigatório/,
            /Campo obrigatório/,
            /Campo obrigatório/,
            /Campo obrigatório/,
            /Campo obrigatório/
        ])
    });

    test("Deve realizar busca pelo termo dead", async function({page, request}){
        const tvshows = dataTvshow.search;

        tvshows.data.forEach(async tvshow => {
            await request.api.postTvshow(tvshow);
        });

        await page.login.do("Admin","admin@zombieplus.com", "pwd123");
        await page.tvshows.visit();
        await page.tvshows.search(tvshows.input, tvshows.output);
    });
})