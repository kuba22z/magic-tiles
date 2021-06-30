// /**
//  * @file Tests the authentication route guard. Visits all pages while not
//  * being validated.
//  **/

// const createTestDescription = (route: string) => {
//     return `browsing /${route} of magic-tiles game should trigger the auth guard and redirect to /validate with negative result.`;
// };

// const pagesToTest: string[] = [
//     "",
//     "/explanation-coupons",
//     "/gaming-screen",
//     "/score-screen",
//     "/result-screen",
// ];

// const checkHeader = () => {
//     cy.get(".header").should("exist");
//     cy.get(".header .logo").should("exist");
//     cy.get(".header .countdown").should("not.exist");
// };

// const checkBody = () => {
//     cy.get(".redirection-counter").should("exist");
//     cy.get("div")
//         .contains("Die Validierung war nicht erfolgreich.")
//         .should("exist");
// };

// /**
//  * @description Actions required to successfully test the validate page.
//  */
// const testValidatePage = () => {
//     cy.url().should("eq", `${Cypress.config().baseUrl}/validate`);
//     checkHeader();
//     checkBody();
// };

// /**
//  * Test suite for our auth guard.
//  */
// describe("Testing if the auth guard of our app does work. Navigating to pages without being validated.", () => {
//     pagesToTest.forEach((page) => {
//         it(createTestDescription(page), () => {
//             cy.visit(page);
//             testValidatePage();
//         });
//     });
// });
