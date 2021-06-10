export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "magic-tiles",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    // config for node server
    server: {
        // reads value from .env file. If no .env file, use 0.0.0.0 (globally
        // accessable)
        host: process.env.HOST_ADDR || "0.0.0.0",
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["~/plugins/axiosAccessor.ts"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://github.com/nuxt-community/proxy-module
        "@nuxtjs/proxy",
    ],

    // https://tailwindcss.nuxtjs.org/releases/#v4.0.0
    tailwindcss: {
        jit: true,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // sets this header as default for all requests we issue with axios.
        headers: {
            common: { "Content-Type": "application/json" },
        },
        proxy: true,
    },

    proxy: {
        // avoids CORS(Cross Origin Ressource Sharing) error for api calls.
        "/api/": {
            target: "https://api.back2street.de",
            pathRewrite: { "^/api/": "" },
        },
        "/test/": {
            target: "https://jsonplaceholder.typicode.com",
            pathRewrite: { "^/test/": "" },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        // necessary so that you can access sound files (mp3 etc.)
        extend(config) {
            config.module.rules.push({
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            });
        },
    },
};
