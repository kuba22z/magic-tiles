// used to access axios inside our store.
// src: https://typescript.nuxtjs.org/cookbook/store/
import { Plugin } from "@nuxt/types";
import { initializeAxios } from "~/utils/api";

const accessor: Plugin = ({ $axios }) => {
    initializeAxios($axios);
};

export default accessor;
