// copied from https://github.com/omerose/cypress-support/blob/master/cypress/integration/sample.spec.ts
describe("Testing if the navigation of our app does work.", () => {
    it("should visit the landing page", () => {
        cy.visit("http://localhost:3000");
    });

    it("can navigate from the landing page to the explanation-coupons page", () => {
        // visits localhost:3000
        cy.visit("http://localhost:3000");
        // gets first element that has class "button" and clicks on it.
        cy.get(".button").first().click();
        // after click on the first button we expect to be at the /explanation-coupons page.
        cy.url().should("include", "/explanation-coupons");
    });

    it("can navigate from the explanation-coupons page to the gaming-screen", () => {
        // visits localhost:3000
        cy.visit("http://localhost:3000/explanation-coupons");
        // gets first element that has class "button" and clicks on it.
        cy.get(".button").first().click();
        // after click on the first button we expect to be at the /gaming-screen page.
        cy.url().should("include", "/gaming-screen");
    });

    it("can navigate from the gaming-screen page to the explanation-coupons page", () => {
        // visits localhost:3000
        cy.visit("http://localhost:3000/gaming-screen");
        // gets first element that has class "button" and clicks on it.
        cy.get(".button").first().click();
        // after click on the first button we expect to be at the /gaming-screen page.
        cy.url().should("include", "/explanation-coupons");
    });

    it("can navigate from the explanation-coupons page to the landing page", () => {
        // visits localhost:3000
        cy.visit("http://localhost:3000/explanation-coupons");
        // gets first element that has class "button" and clicks on it.
        cy.get(".button").last().click();
        // after click on the first button we expect to be at the /gaming-screen page.
        cy.url().should("equal", "http://localhost:3000/");
    });
});
