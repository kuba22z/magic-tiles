// /**
//  * @file Tests the authentication route guard. Visits all pages while not
//  * being validated.
//  **/

/**
 * Test suite for our auth guard.
 */
describe("Testing if the auth guard of our app does work. Navigating to pages without being validated.", () => {
    const createTestDescription = (route: string) => {
        return `tests if browsing ${route} triggers the auth guard and redirects to /validate page with negative result.`;
    };

    const pagesToTest: string[] = [
        "/",
        "/explanation-coupons",
        "/gaming-screen",
        "/score-screen",
        "/result-screen",
    ];

    const checkHeader = () => {
        cy.get(".header").should("exist");
        cy.get(".header .logo").should("exist");
        cy.get(".header .countdown").should("not.exist");
    };

    const checkBody = () => {
        cy.get(".redirection-counter").should("exist");
        cy.get("div")
            .contains("Die Validierung war nicht erfolgreich.")
            .should("exist");
    };

    pagesToTest.forEach((page) => {
        it(createTestDescription(page), () => {
            cy.visit(page);
            cy.url().should("eq", `${Cypress.config().baseUrl}/validate`);
            checkHeader();
            checkBody();
        });
    });
});
