/**
 * @file Tests the authentication route guard. Visits all pages while being
 * validated and while not being validated.
 */

describe("Testing if the auth guard of our app does work.", () => {
    // describe("Testing without being validated", () => {
    //     it("should get redirected to the /fake-redirect page when browsing /", () => {
    //         cy.visit("");
    //         cy.url().should("include", "/fake-redirect");
    //     });

    //     it("should get redirected to the /fake-redirect page when browsing /explanation-coupons", () => {
    //         cy.visit("/explanation-coupons");
    //         cy.url().should("include", "/fake-redirect");
    //     });

    //     it("should get redirected to the /fake-redirect page when browsing /gaming-screen", () => {
    //         cy.visit("/gaming-screen");
    //         cy.url().should("include", "/fake-redirect");
    //     });

    //     it("should get redirected to the /fake-redirect page when browsing /score-screen", () => {
    //         cy.visit("/score-screen");
    //         cy.url().should("include", "/fake-redirect");
    //     });

    //     it("should get redirected to the /fake-redirect page when browsing /result-screen", () => {
    //         cy.visit("/result-screen");
    //         cy.url().should("include", "/fake-redirect");
    //     });
    // });

    describe("Testing while being validated.", () => {
        // validate before each test
        beforeEach(() => {
            cy.log("beforeEach hook fired.");
        });

        it("can validate the user", () => {
            cy.visit("http://localhost:3000/testing/fake-redirect");
            // redirects to validate page
            cy.get("div").contains("magic-tiles").click();
            // expects to successfully validate and land at starting page
            cy.url().should("eq", `${Cypress.config().baseUrl}/`);
        });

        it("can navigate through the app after being validated.", () => {
            cy.visit("http://localhost:3000/testing/fake-redirect");
            // redirects to validate page
            cy.get("div").contains("magic-tiles").click();
            // expects to successfully validate and land at starting page
            cy.url().should("eq", `${Cypress.config().baseUrl}/`);
            // expects to successfully get redirected to coupons-screen
            cy.get("a").contains("Weiter").click();
            cy.url().should(
                "eq",
                `${Cypress.config().baseUrl}/explanation-coupons`
            );
            // expects to successfully get redirected to the gaming-screen
            // scrolls to bottom to find the button
            cy.scrollTo("bottom");
            cy.get("a").contains("Verstanden").click();
            cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        });
    });
});
