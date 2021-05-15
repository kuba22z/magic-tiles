// util that is used to initializes axios for us
// src: https://typescript.nuxtjs.org/cookbook/store/
import { NuxtAxiosInstance } from "@nuxtjs/axios";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
    $axios = axiosInstance;
}

export { $axios };
