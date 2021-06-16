// src: https://typescript.nuxtjs.org/cookbook/middlewares/
/**
 * @file Will be called on every page visit. Redirects user to the page where he
 * can log in/register.  Only exceptions: a) user is validated b) user tries to
 * validate
 */

import { Middleware } from "@nuxt/types";
import { gameInfoStore } from "~/store";

const auth: Middleware = (context) => {
    // only let the user continue if he is validated or he is trying to validate.
    if (gameInfoStore.userValidated || context.route.path === "/validate") {
        return;
    }

    // TODO(pierre): redirect to main-backend page once we have an account there
    // and can test the app
    context.redirect("/fake-redirect");
};

export default auth;
