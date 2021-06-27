// src: https://typescript.nuxtjs.org/cookbook/middlewares/
/**
 * @file Will be called on every page visit. Redirects user to the page where he
 * can log in/register.  Only exceptions: a) user is validated b) user tries to
 * validate
 */

import { Middleware } from "@nuxt/types";
import { gameInfoStore } from "~/store";
import { GameInfoStorage } from "~/utils/GameInfoStorage";

const auth: Middleware = (context) => {
    // allow user to continue if he wants to validate or if we are testing with
    // cypress
    if (
        context.route.path === "/validate" ||
        context.route.path === "/testing/fake-redirect"
    ) {
        return;
    }

    // allow user if he is validated and has time left
    if (gameInfoStore.userValidated && gameInfoStore.getSecondsLeft > 0) {
        return;
    }

    // allow user if his validation is stored in localstorage and he has time
    // left
    if (GameInfoStorage.storageInitialized()) {
        GameInfoStorage.initStoreFromStorage();
        if (gameInfoStore.getSecondsLeft > 0) {
            return;
        }
    }

    // redirect to main page if we don't allow user to our page.
    context.redirect("https://back2street.de");
};

export default auth;
