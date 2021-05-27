// copied from https://github.com/omerose/cypress-support/blob/master/cypress/integration/sample.spec.ts
describe("Sample Cypress setup", () => {
    it("should go to Google using a command", () => {
        cy.google();
    });

    it("should go to Google directly", () => {
        cy.visit("https://google.com");
    });
});
