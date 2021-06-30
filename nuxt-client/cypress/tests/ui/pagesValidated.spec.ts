/* eslint-disable cypress/no-unnecessary-waiting */
/**
 * @file Tests the /validate page. Shall redirect to the back2street.de page if
 * we don't get validated.  Will redirect to landing page '/' when we are
 * validated.
 */

const logIntoMainPage = () => {
    cy.visit("https://back2street.de", {
        auth: {
            username: "b2s",
            password: "secretb2s",
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
};

const selectMagicTilesFromSponsorLavalle = () => {
    // selects img for sponsor lavalle
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624460867gHsR8.png"'
    ).click();

    // selets the img which redirects us to the magic tiles game
    cy.get(
        '[src="https://api.back2street.de/storage/images/1624826289EueVn.png"]'
    ).click();
};

/**
 * Test suite for all our pages
 */
describe("Testing contents of each page", () => {
    /**
     * @description logs into back2street page and starts the magic tiles game
     * before every test case.  This is required since unvalidated users will
     * just be redirected to /validate and to the main backend page.
     */
    beforeEach(() => {
        logIntoMainPage();
        selectMagicTilesFromSponsorLavalle();
    });

    // it("tests contents and buttons of the landing page", () => {
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    //     // make sure we are on the magic tiles game by checking the game-title "magic-tiles"
    //     cy.get("div .game-title").contains("magic-tiles");
    //     // makes sure we have a header on the page
    //     cy.get(".header").should("be.visible");
    //     // makes sure the countdown is visible
    //     cy.get(".countdown").should("be.visible");
    //     // makes sure we see a logo
    //     cy.get(".logo").should("be.visible");
    //     // makes sure "score" is displayed on this page
    //     cy.get("div").contains("Score");
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // makes sure we have two buttons on this page
    //     cy.get(".button").should("have.length", 2);
    //     // clicking on button 'Weiter' will redirect to /explanation-timer
    //     cy.get(".button").contains("Weiter").click();
    //     // // uses router history to go back to the / page
    //     cy.go("back");
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    //     // clicking on back2street will redirect to main page
    //     cy.get(".button").contains("Back to street!").click();
    //     cy.url().should("eq", "https://back2street.de/");
    // });

    // it("tests contents and buttons of the explanation-timer page", () => {
    //     // makes sure we have two buttons on this page
    //     cy.get(".button").should("have.length", 2);
    //     // clicking on button 'Weiter' will redirect to /explanation-timer
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);

    //     // makes sure we have a header on the page
    //     cy.get(".header").should("be.visible");
    //     // makes sure the countdown is visible
    //     cy.get(".countdown").should("be.visible");
    //     // makes sure we see a logo
    //     cy.get(".logo").should("be.visible");
    //     // makes sure we see caption for Zeitliche Begrenzung
    //     cy.get("div").contains("Zeitliche Begrenzung");
    //     // makes sure we see caption for Spielende
    //     cy.get("div").contains("Spielende");
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").should("have.length", 2);
    //     // clicking on "Zurück" will navigate to "/" page
    //     cy.get(".button").contains("Zurück").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    //     // uses router history to go back to the last page
    //     cy.go("back");
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // clicking on "Weiter" will navigate to "/sponsor" page
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    // });

    // it("tests contents and buttons of the sponsor page", () => {
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // makes sure we have two buttons on this page
    //     cy.get(".button").should("have.length", 2);
    //     // clicking on button 'Weiter' will redirect to /explanation-timer
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // clicking on "Weiter" will navigate to "/sponsor" page
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);

    //     // makes sure we have a header on the page
    //     cy.get(".header").should("be.visible");
    //     // makes sure the countdown is visible
    //     cy.get(".countdown").should("be.visible");
    //     // makes sure we see a logo
    //     cy.get(".logo").should("be.visible");
    //     // makes sure we are displaying a sponsorname
    //     cy.get(".sponsor").should("not.be.empty");
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // makes sure we are displaying a sponsor description
    //     cy.get(".sponsor-description").should("not.be.empty");
    //     // clicking on "Zurück" will navigate to "/explanation.timer" page
    //     cy.get(".button").contains("Zurück").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    //     // uses router history to go back to the previous page
    //     cy.go("back");
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    //     // clicking on "Weiter" will navigate to "/explanation-coupons" page
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should(
    //         "eq",
    //         `${Cypress.config().baseUrl}/explanation-coupons`
    //     );
    // });

    // it("tests contents and buttons of the explanation-coupons page", () => {
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // makes sure we have two buttons on this page
    //     cy.get(".button").should("have.length", 2);
    //     // clicking on button 'Weiter' will redirect to /explanation-timer
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    //     // scrolls down to make sure we see the two buttons
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // clicking on "Weiter" will navigate to "/sponsor" page
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    //     // clicking on "Weiter" will navigate to "/explanation-coupons" page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     // clicking on "Weiter" will navigate to "/explanation-coupons" page
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should(
    //         "eq",
    //         `${Cypress.config().baseUrl}/explanation-coupons`
    //     );

    //     // makes sure we have a header on the page
    //     cy.get(".header").should("be.visible");
    //     // makes sure the countdown is visible
    //     cy.get(".countdown").should("be.visible");
    //     // makes sure we see a logo
    //     cy.get(".logo").should("be.visible");
    //     // clicking on "Zurück" will navigate to "/sponsor" page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Zurück").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    //     // uses router history to go back to the previous page
    //     cy.go("back");
    //     cy.url().should(
    //         "eq",
    //         `${Cypress.config().baseUrl}/explanation-coupons`
    //     );
    //     // clicking on "Verstanden" will navigate to /gaming-screen page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Verstanden!").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
    // });

    // it("tests contents and buttons of the gaming-screen page", () => {
    //     /**
    //      * navigating to /gaming-screen
    //      */
    //     // clicking on button 'Weiter' will redirect to /explanation-timer
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);
    //     // clicking on "Weiter" will navigate to "/sponsor" page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
    //     // clicking on "Weiter" will navigate to "/explanation-coupons" page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Weiter").click();
    //     cy.url().should(
    //         "eq",
    //         `${Cypress.config().baseUrl}/explanation-coupons`
    //     );
    //     // clicking on "Verstanden" will navigate to "/explanation-coupons" page
    //     cy.scrollTo("bottom");
    //     cy.wait(300);
    //     cy.get(".button").contains("Verstanden!").click();
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);

    //     /**
    //      * testing /gaming-screen
    //      */
    //     // timer calling down from 3 to 0 is visible in the beginning
    //     cy.get("circle").should("be.visible");
    //     cy.get(".countDownText").should("be.visible");
    //     cy.wait(3200);
    //     // timer counting down from 3 to 0 should not be visible anymore.
    //     cy.get("circle").should("not.be.visible");
    //     cy.get(".countDownText").should("not.be.visible");
    //     // header with logo and correct-image should exist
    //     cy.get(".header").should("exist");
    //     cy.get(".logo").should("exist");
    //     cy.get(".time").should("exist");
    //     cy.get(".correct-image").should("exist");
    //     cy.get(".score").should("exist");
    //     cy.get(".highscore").should("exist");
    //     // game board should exist
    //     cy.get(".game-board").should("exist");
    //     // waiting for some images to flow down, before reaching the bottom
    //     cy.wait(2000);
    //     // at least 4 rectangles should have been spawned by now.
    //     cy.get("rect").should("have.length.at.least", 4);
    //     // waits until the first row has reached the bottom and the game is over.
    //     cy.wait(4000);
    //     // url should now be /score-screen
    //     cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);
    // });
});
