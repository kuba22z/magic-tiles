// src: https://typescript.nuxtjs.org/cookbook/middlewares/
/**
 * @file Will be called on every page visit. If the user is not authenticated he
 * will the redirected to the page where he can log in and/or register.  If he
 * is authenticated nothing happens.
 */

import { Middleware } from "@nuxt/types";
import { gameInfoStore } from "~/store";

const auth: Middleware = ({ redirect }) => {
    if (gameInfoStore.userValidated) {
        return;
    }

    // TODO(pierre): redirect to main-backend page once we have an account there
    // and can test the app
    redirect("/fake-redirect");
};

export default auth;
