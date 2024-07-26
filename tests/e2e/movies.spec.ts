import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ToastComponent } from "../components/Toast";
import { AlertComponent } from "../components/Alert";
import { MoviesPage } from "../pages/MoviesPage";
import dataMovies from "../support/fixtures/movies.json"

let loginPage
let moviesPage
let toastComponent
let alertComponent

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page);
    moviesPage = new MoviesPage(page);
    toastComponent = new ToastComponent(page);
    alertComponent = new AlertComponent(page);
})

test("Deve poder cadastar um novo filme", async function({page}){
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await moviesPage.isLoggedIn();
    await moviesPage.create(dataMovies.guerra_mundial_z);
})