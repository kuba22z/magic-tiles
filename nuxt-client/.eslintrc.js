module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        // rules specific for cypress
        "plugin:cypress/recommended",
        // prettier has to be the last to overwrite eslint rules.
        "plugin:prettier/recommended",
    ],
    plugins: [],
    // add your custom rules here
    rules: {},
};
