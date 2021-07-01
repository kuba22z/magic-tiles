// base file taken from: https://github.com/omerose/cypress-support/blob/master/cypress/support/commands.ts
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            navigate(pageName: string): void;
            saveLocalStorage(): Chainable<any>;
            restoreLocalStorage(): Chainable<any>;
        }
    }
}

/**
 * @description Helper functions to include usage of locastorage for multiple
 * test cases since this is not configurable by default by cypress.
 * @src Credit who credit is due:
 * https://github.com/cypress-io/cypress/issues/461
 */
const LOCAL_STORAGE_MEMORY: any = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach((key) => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
    cy.log("saving the localstorage inside cypress variable.");
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
    cy.log("loading the localstorage from cypress variable.");
});

/**
 * Navigates to page with pageName
 */
Cypress.Commands.add("navigate", (pageName) => {
    // Find navigation menu item
    // Click on it
    cy.visit(`/${pageName}`);
});

// Convert this to a module instead of script (allows import/export)
export {};
