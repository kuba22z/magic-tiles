// src: https://typescript.nuxtjs.org/cookbook/middlewares/
/**
 * @file Will be called on every page visit. If the user is not authenticated he
 * will the redirected to the page where he can log in and/or register.  If he
 * is authenticated nothing happens.
 */

import { Context, Middleware } from "@nuxt/types";
import { gameInfoStore } from "~/store";

const auth: Middleware = (context) => {
    console.log("auth middleware fired.");

    // only let the user continue if he is validated or he is trying to validate.
    if (gameInfoStore.userValidated || context.route.path === "/validate") {
        return;
    }

    // TODO(pierre): redirect to main-backend page once we have an account there
    // and can test the app
    context.redirect("/fake-redirect");
};

export default auth;
