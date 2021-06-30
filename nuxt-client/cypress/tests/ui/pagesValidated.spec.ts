/* eslint-disable cypress/no-unnecessary-waiting */
/**
 * @file Tests the /validate page. Shall redirect to the back2street.de page if
 * we don't get validated.  Will redirect to landing page '/' when we are
 * validated.
 */

/**
 * @description logs into back2street page and starts the magic tiles game.
 */
beforeEach(() => {
    cy.visit("https://back2street.de", {
        auth: {
            username: "b2s",
            password: "secretb2s",
            // username: Cypress.env("credentials").username,
            // password: Cypress.env("credentials").password,
        },
    });
    // selects img for sponsor lavalle
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624460867gHsR8.png"'
    ).click();

    // selets the img which redirects us to the magic tiles game
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624826289EueVn.png"]'
    ).click();

    // selects field with id email-address and types in the email
    cy.get("#email-address")
        .type("test@test.de")
        .should("have.value", "test@test.de");

    // selects field with id password and types in the password
    cy.get("#password").type("testtest").should("have.value", "testtest");
    cy.get("form button").click();

    // selects img for sponsor lavalle
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624460867gHsR8.png"'
    ).click();

    // selets the img which redirects us to the magic tiles game
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624826289EueVn.png"]'
    ).click();
});

describe("Testing contents of each page", () => {});

it("tests contents and buttons of the landing page", () => {
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    // make sure we are on the magic tiles game by checking the game-title "magic-tiles"
    cy.get("div .game-title").contains("magic-tiles");
    // makes sure we have a header on the page
    // TODO(pierre): adapt this once the change is live on master
    // cy.get(".header").should("be.visible");
    // makes sure the countdown is visible
    cy.get(".countdown").should("be.visible");
    // makes sure we see a logo
    cy.get(".logo").should("be.visible");
    // makes sure "score" is displayed on this page
    cy.get("div").contains("Score");
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // makes sure we have two buttons on this page
    cy.get(".button").should("have.length", 2);
    // clicking on button 'Weiter' will redirect to /explanation-timer
    cy.get(".button").contains("Weiter").click();
    // // uses router history to go back to the / page
    cy.go("back");
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    // clicking on back2street will redirect to main page
    cy.get(".button").contains("Back to street!").click();
    cy.url().should("eq", "https://back2street.de/");
});

it("tests contents and buttons of the explanation-timer page", () => {
    // makes sure we have two buttons on this page
    cy.get(".button").should("have.length", 2);
    // clicking on button 'Weiter' will redirect to /explanation-timer
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);

    // makes sure we have a header on the page
    // TODO(pierre): adapt this once the change is live on master
    // cy.get(".header").should("be.visible");
    // makes sure the countdown is visible
    cy.get(".countdown").should("be.visible");
    // makes sure we see a logo
    cy.get(".logo").should("be.visible");
    // makes sure we see caption for Zeitliche Begrenzung
    cy.get("div").contains("Zeitliche Begrenzung");
    // makes sure we see caption for Spielende
    cy.get("div").contains("Spielende");
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    cy.get(".button").should("have.length", 2);
    // clicking on "Zurück" will navigate to "/" page
    cy.get(".button").contains("Zurück").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    // uses router history to go back to the last page
    cy.go("back");
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // clicking on "Weiter" will navigate to "/sponsor" page
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
});

it("tests contents and buttons of the sponsor page", () => {
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // makes sure we have two buttons on this page
    cy.get(".button").should("have.length", 2);
    // clicking on button 'Weiter' will redirect to /explanation-timer
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // clicking on "Weiter" will navigate to "/sponsor" page
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);

    // makes sure we have a header on the page
    // TODO(pierre): adapt this once the change is live on master
    // cy.get(".header").should("be.visible");
    // makes sure the countdown is visible
    cy.get(".countdown").should("be.visible");
    // makes sure we see a logo
    cy.get(".logo").should("be.visible");
    // makes sure we are displaying a sponsorname
    cy.get(".sponsor").should("not.be.empty");
    cy.scrollTo("bottom");
    cy.wait(300);
    // makes sure we are displaying a sponsor description
    cy.get(".sponsor-description").should("not.be.empty");
    // clicking on "Zurück" will navigate to "/explanation.timer" page
    cy.get(".button").contains("Zurück").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    // uses router history to go back to the previous page
    cy.go("back");
    cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    // clicking on "Weiter" will navigate to "/explanation-coupons" page
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-coupons`);
});

it("tests contents and buttons of the explanation-coupons page", () => {
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // makes sure we have two buttons on this page
    cy.get(".button").should("have.length", 2);
    // clicking on button 'Weiter' will redirect to /explanation-timer
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    // scrolls down to make sure we see the two buttons
    cy.scrollTo("bottom");
    cy.wait(300);
    // clicking on "Weiter" will navigate to "/sponsor" page
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    // clicking on "Weiter" will navigate to "/explanation-coupons" page
    cy.scrollTo("bottom");
    cy.wait(300);
    // clicking on "Weiter" will navigate to "/explanation-coupons" page
    cy.get(".button").contains("Weiter").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-coupons`);

    // makes sure we have a header on the page
    // TODO(pierre): adapt this once the change is live on master
    // cy.get(".header").should("be.visible");
    // makes sure the countdown is visible
    cy.get(".countdown").should("be.visible");
    // makes sure we see a logo
    cy.get(".logo").should("be.visible");
    // clicking on "Zurück" will navigate to "/sponsor" page
    /* TODO(pierre): uncomment this after fix is on master.
    // cy.scrollTo("bottom");
    // cy.wait(300);
    // cy.get(".button").contains("Zurück").click();
    // cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    // uses router history to go back to the previous page
    // cy.go("back");
    // cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-coupons`);
    */
    // clicking on "Verstanden" will navigate to /gaming-screen page
    cy.scrollTo("bottom");
    cy.wait(300);
    cy.get(".button").contains("Verstanden!").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
});
