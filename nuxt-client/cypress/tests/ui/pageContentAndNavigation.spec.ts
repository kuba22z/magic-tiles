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
describe("Testing the contents and navigation behaviour of all our pages.", () => {
    const validateWithTestPage = () => {
        cy.visit("/testing/fake-redirect");
    };
    /**
     * @description Uses a test page to validate ourself. This is required
     * since unvalidated users will just be redirected to /validate and to the
     * main backend page. Then stores the token we captured in localstorage
     * which will then be loaded before every test in this suite.
     */
    before(() => {
        validateWithTestPage();
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("tests contents and buttons of the '/' (the landing) page", () => {
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
        // make sure we are on the magic tiles game by checking the game-title "magic-tiles"
        cy.get("div .game-title")
            .contains("SCHNAPPEN ODER RAUS!")
            .should("exist");
        // makes sure we have a header on the page
        cy.get(".header").should("be.visible");
        // makes sure the countdown exists
        cy.get(".countdown").should("exist");
        // makes sure we see a logo
        cy.get(".logo").should("be.visible");
        // makes sure "score" is displayed on this page
        cy.get("div").contains("Score").should("exist");
        // scrolls down to make sure we see the two buttons
        cy.scrollTo("bottom");
        cy.wait(300);
        // makes sure we have two buttons on this page
        cy.get(".button").should("have.length", 2);
        cy.get(".button").contains("Back to street!").should("exist");
        // clicking on button 'Weiter' will redirect to /explanation-timer
        cy.get(".button").contains("Weiter").click();
        // // uses router history to go back to the / page
        cy.go("back");
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("tests contents and buttons of the /explanation-timer page", () => {
        cy.visit("/explanation-timer");
        cy.url().should("eq", `${Cypress.config().baseUrl}/explanation-timer`);

        // makes sure we have a header on the page
        cy.get(".header").should("be.visible");
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

    it("tests contents and buttons of the /sponsor page", () => {
        cy.visit("/sponsor");
        cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);

        // makes sure we have a header on the page
        cy.get(".header").should("be.visible");
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
        cy.url().should(
            "eq",
            `${Cypress.config().baseUrl}/explanation-coupons`
        );
    });

    it("tests contents and buttons of the /explanation-coupons page", () => {
        cy.visit("/explanation-coupons");
        cy.url().should(
            "eq",
            `${Cypress.config().baseUrl}/explanation-coupons`
        );

        // makes sure we have a header on the page
        cy.get(".header").should("be.visible");
        // makes sure the countdown is visible
        cy.get(".countdown").should("be.visible");
        // makes sure we see a logo
        cy.get(".logo").should("be.visible");
        // clicking on "Zurück" will navigate to "/sponsor" page
        cy.scrollTo("bottom");
        cy.wait(300);
        cy.get(".button").contains("Zurück").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/sponsor`);
        // uses router history to go back to the previous page
        cy.go("back");
        cy.url().should(
            "eq",
            `${Cypress.config().baseUrl}/explanation-coupons`
        );
        // clicking on "Verstanden" will navigate to /gaming-screen page
        cy.scrollTo("bottom");
        cy.wait(300);
        cy.get(".button").contains("Verstanden!").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
    });

    it("tests contents of the /gaming-screen page", () => {
        cy.visit("/gaming-screen");
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        // header with logo and correct-image should exist
        cy.get(".header").should("exist");
        cy.get(".logo").should("exist");
        cy.get(".time").should("exist");
        cy.get(".correct-image").should("exist");
        cy.get(".score").should("exist");
        cy.get(".highscore").should("exist");
        // game board should exist
        cy.get(".game-board").should("exist");
    });

    it("tests contents and navigation of the /score-screen page", () => {
        cy.visit("/score-screen");
        // url should now be /score-screen
        cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);

        cy.wait(200);
        // clicking on Nochmal Spielen! lets us play the game again
        cy.get("div").contains("Nochmal Spielen!").should("exist");
        cy.get("div").contains("Nochmal Spielen!").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        // timer counting down from 3 to 0 is visible in the beginning
        cy.get("circle").should("be.visible");
        cy.get(".countDownText").should("be.visible");
        cy.wait(3200);
        // makes sure we are still on gaming-screen
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        // waits until the first row has reached the bottom and the game is over.
        cy.wait(5000);
        cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);
        // submit score by clicking button will have us end up at result-screen
        cy.get("div").contains("Highscore abschicken!").should("exist");
        cy.get("div").contains("Highscore abschicken!").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/result-screen`);
        // result-screen should display negative result
        cy.get(".title").contains("Schade!").should("exist");
        cy.get(".redirect-notification")
            .contains("Leider hat es heute nicht geklappt.")
            .should("exist");
    });

    it("tests /result-screen page with a highscore of 0", () => {
        cy.visit("/result-screen");
        cy.url().should("eq", `${Cypress.config().baseUrl}/result-screen`);
        // highscore 0 will not win us a coupon. checks that the page displays a
        // negative result.
        cy.get(".title").contains("Schade!").should("exist");
        cy.get(".redirect-notification")
            .contains("Leider hat es heute nicht geklappt.")
            .should("exist");
        // sponsor name should also exist on negative result
        cy.get(".sponsor").should("exist");
    });
});
