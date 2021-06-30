/**
 * @file Tests the authentication route guard. Visits all pages while not
 * being validated.
 **/

describe("Testing if the auth guard of our app does work.", () => {
    beforeEach(() => {
        cy.visit("https://back2street.de", {
            auth: {
                username: "b2s",
                password: "secretb2s",
            },
        });
    });
    it("should redirect to the back2street main page page when browsing / of magic-tiles game", () => {
        cy.visit("");
        cy.url().should("eq", "https://back2street.de/");
    });

    it("should get redirected to the back2street main page page when browsing /explanation-coupons of magic-tiles game", () => {
        cy.visit("/explanation-coupons");
        cy.url().should("eq", "https://back2street.de/");
    });

    it("should get redirected to the back2street main page page when browsing /gaming-screen of magic-tiles game", () => {
        cy.visit("/gaming-screen");
        cy.url().should("eq", "https://back2street.de/");
    });

    it("should get redirected to the back2street main page page when browsing /score-screen of magic-tiles game", () => {
        cy.visit("/score-screen");
        cy.url().should("eq", "https://back2street.de/");
    });

    it("should get redirected to the back2street main page page when browsing /result-screen of magic-tiles game", () => {
        cy.visit("/result-screen");
        cy.url().should("eq", "https://back2street.de/");
    });
});
