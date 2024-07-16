import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ToastComponent } from "../components/Toast";

let loginPage
let toastComponent

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page);
    toastComponent = new ToastComponent(page);
})

test("Deve logar como administrador", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await loginPage.isLoggedIn();
});

test("Nâo deve logar com senha incorreta", async ({page}) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd1234");
    await toastComponent.haveText(/Oops!Ocorreu um erro ao tentar efetuar o login/)
})