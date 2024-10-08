import { test as base, expect, Page, Request } from "@playwright/test";
import { Login } from "./actions/Login";
import { Leads } from "./actions/Leads";
import { Movies } from "./actions/Movies";
import { Tvshows } from "./actions/Tvshow";
import { Api } from "./api";
import { PopupComponent } from "../components/Popup";
import { AlertComponent } from "../components/Alert";
import { LogiXp } from "./actions/LoginXp";

interface CustomPage extends Page {
    login: Login;
    loginXp: LogiXp
    landing: Leads;
    movies: Movies;
    tvshows: Tvshows;
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
        context['loginXp'] = new LogiXp(page);
        context['movies'] = new Movies(page);
        context['tvshows'] = new Tvshows(page);
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