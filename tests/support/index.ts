import { test as base, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { LandingPage } from "../pages/landingPage";
import { MoviesPage } from "../pages/MoviesPage";
import { ToastComponent } from "../components/Toast";
import { AlertComponent } from "../components/Alert";

// Define a custom interface extending the Playwright Page type
interface CustomPage extends Page {
    login: LoginPage;
    landing: LandingPage;
    movies: MoviesPage;
    toast: ToastComponent;
    alert: AlertComponent;
}

const test = base.extend<{
    page: CustomPage;
}>({
    page: async ({ page }, use) => {
        // Cast the page to the custom type
        const customPage = page as CustomPage;
        customPage.login = new LoginPage(page);
        customPage.landing = new LandingPage(page);
        customPage.movies = new MoviesPage(page);
        customPage.toast = new ToastComponent(page);
        customPage.alert = new AlertComponent(page);

        await use(customPage);
    }
});

export { test, expect };
