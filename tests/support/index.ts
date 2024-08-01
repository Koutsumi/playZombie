import { test as base, expect, Page } from "@playwright/test";
import { Login } from "./actions/Login";
import { Leads } from "./actions/Leads";
import { Movies } from "./actions/Movies";
import { ToastComponent } from "../components/Toast";
import { AlertComponent } from "../components/Alert";

interface CustomPage extends Page {
    login: Login;
    landing: Leads;
    movies: Movies;
    toast: ToastComponent;
    alert: AlertComponent;
}

const test = base.extend<{page: CustomPage}>({
    page: async ({page}, use) => {
        const context = page
        context['landing'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['toast'] = new ToastComponent(page);
        context['alert'] = new AlertComponent(page);

        await use(context);
    }
});

export { test, expect };