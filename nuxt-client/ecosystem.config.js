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
            // watches all files inside the .nuxt folder and auto reloads if
            // any files in this folder change.
            watch: [".nuxt"],
            // delay between first file change and pm2 reload. Assumes it will
            // take maximum 10s to copy all files to the .nuxt folder.
            watch_delay: 10000,
            // restart every 5s if app crashes
            restart_delay: 5000,
        },
    ],
};
