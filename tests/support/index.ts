import { test as base, expect, Page, Request } from "@playwright/test";
import { Login } from "./actions/Login";
import { Leads } from "./actions/Leads";
import { Movies } from "./actions/Movies";
import { Api } from "./api";
import { PopupComponent } from "../components/Popup";
import { AlertComponent } from "../components/Alert";

interface CustomPage extends Page {
    login: Login;
    landing: Leads;
    movies: Movies;
    popup: PopupComponent;
    alert: AlertComponent;

}

interface CustomRequest extends Request{
    api: Api;
}

const test = base.extend<{page: CustomPage, request: CustomRequest}>({
    page: async ({page}, use) => {
        const context = page
        context['landing'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['popup'] = new PopupComponent(page);
        context['alert'] = new AlertComponent(page);

        await use(context);
    },
    request: async ({request}, use) => {
        const context = request
        context['api'] = new Api(request);
        await use(context);
    }
});

export { test, expect };