/**
 *
 * Author: Pierre Dahmani
 * Created: 29.04.2021
 *
 * Description: Config file for pm2. Enables auto reloading our server when
 * files change.
 */

// https://github.com/Unitech/pm2
// https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
    apps: [
        {
            // display name when we use pm2 ls. will be replaced by the gitlab
            // runner to match current branch name and MAYBE(pierre): use CI
            // variable to get name of current repo and prepend that name
            name: "changeThisNameWithSed",
            // port where pm2 cluster will be reachable
            port: "changeThisPortWithSed",
            // creates multiple running instances which enable us hot reload
            // without downtime
            exec_mode: "cluster",
            // can increase number of instances.
            instances: "2",
            // script used to start the nuxt server
            script: "./node_modules/nuxt/bin/nuxt.js",
            // arguments that are be passed to the nuxt server
            args: "start",
            // auto restarts pm2 when files change
            watch: true,
            // delay between first file change -> restart
            watch_delay: 5000,
            // ignores changes to node_modules
            ignore_watch: ["node_modules"],
            // restart every 5s if app crashes
            restart_delay: 5000,
        },
    ],
};
