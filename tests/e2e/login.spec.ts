import { test } from "../support"

test("Deve logar como administrador", async ({page}) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "pwd123");
    await page.movies.isLoggedIn();
});

test("Não deve logar com senha incorreta", async ({page}) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "pwd1234");
    await page.toast.containText(/Oops!Ocorreu um erro ao tentar efetuar o login/)
})

test("Não deve logar quando a senha não é preenchida", async ({page}) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "");
    await page.alert.haveText("Campo obrigatório");
})

test("Não deve logar quando o e-mail não é preenchida", async ({page}) => {
    await page.login.visit();
    await page.login.submit("", "pwd123");
    await page.alert.haveText("Campo obrigatório");
})

test("Não deve logar quando nenhum campo é preenchido", async ({page}) => {
    await page.login.visit();
    await page.login.submit("", "");
    await page.alert.haveText(["Campo obrigatório","Campo obrigatório"]);
})

test("Não deve logar quando o e-mail é inválido", async ({page}) => {
    await page.login.visit();
    await page.login.submit("www.teste.com", "pwd123");
    await page.alert.haveText("Email incorreto");
})