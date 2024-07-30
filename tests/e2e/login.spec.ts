import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ToastComponent } from "../components/Toast";
import { AlertComponent } from "../components/Alert";
import { MoviesPage } from "../pages/MoviesPage";

let loginPage
let moviePage
let toastComponent
let alertComponent

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page);
    moviePage = new MoviesPage(page);
    toastComponent = new ToastComponent(page);
    alertComponent = new AlertComponent(page);
})

test("Deve logar como administrador", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await moviePage.isLoggedIn();
});

test("Não deve logar com senha incorreta", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd1234");
    await toastComponent.containText(/Oops!Ocorreu um erro ao tentar efetuar o login/)
})

test("Não deve logar quando a senha não é preenchida", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "");
    await alertComponent.haveText("Campo obrigatório");
})

test("Não deve logar quando o e-mail não é preenchida", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("", "pwd123");
    await alertComponent.haveText("Campo obrigatório");
})

test("Não deve logar quando nenhum campo é preenchido", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("", "");
    await alertComponent.haveText(["Campo obrigatório","Campo obrigatório"]);
})

test("Não deve logar quando o e-mail é inválido", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("www.teste.com", "pwd123");
    await alertComponent.haveText("Email incorreto");
})