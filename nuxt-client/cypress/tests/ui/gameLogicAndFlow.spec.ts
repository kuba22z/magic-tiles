/* eslint-disable cypress/no-unnecessary-waiting */
/**
 * Test suite for game logic tests.
 */
describe("Testing the gaming logic and flow while being validated.", () => {
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

    /**
     * Helper function to play the game and click on retry after we the game
     * stopped. Expects to start in /gaming-screen page.
     * @param retries amount of retries we will play the game for.
     */
    const loseGameAndRetry = (retries: number) => {
        if (retries === 0) {
            return;
        }

        // timer counting down from 3 to 0 is visible in the beginning
        cy.get("circle").should("be.visible");
        cy.get(".countDownText").should("be.visible");
        cy.wait(3200);
        // waits until the first row has reached the bottom and the game is over.
        cy.wait(5000);
        // url should now be /score-screen
        cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);
        // clicking on Nochmal Spielen! lets us play the game again
        cy.get("div").contains("Nochmal Spielen!").should("exist");
        cy.get("div").contains("Nochmal Spielen!").click();

        loseGameAndRetry(retries - 1);
    };

    /**
     * @description Expects to start in /gaming-screen page. Loses the game and
     * submits the result.
     */
    const loseAndSendHighscore = () => {
        // timer counting down from 3 to 0 is visible in the beginning
        cy.get("circle").should("be.visible");
        cy.get(".countDownText").should("be.visible");
        cy.wait(3200);
        // waits until the first row has reached the bottom and the game is over.
        cy.wait(5000);
        // url should now be /score-screen
        cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);
        // clicking on Highscore abschicken! sends us to result-screen
        cy.get("div").contains("Highscore abschicken!").should("exist");
        cy.get("div").contains("Highscore abschicken!").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/result-screen`);
    };

    it("Tests if we can play the game multiple times.", () => {
        cy.visit("/gaming-screen");
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        // try playing the game three times in a row.
        loseGameAndRetry(3);
    });

    it("Tests that playing the game and sending a highscore of 0 will not result in a coupon.", () => {
        cy.visit("/gaming-screen");
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);
        // lose game and send highscore
        loseAndSendHighscore();
        // highscore 0 will not win us a coupon. checks that the page displays a
        // negative result.
        cy.get(".title").contains("Schade!").should("exist");
        cy.get(".redirect-notification")
            .contains("Leider hat es heute nicht geklappt.")
            .should("exist");
        cy.wait(300);
    });

    /*
    // TODO(pierre): ask jakub if we should keep this test?
    const makePoints = () => {
        cy.wait(2800);
        cy.get(
            'svg [href="https://api.back2street.de/storage/images/mYs8Yn2xaO93PfuFiSEQl2tqV6Vp3EYXUBQ5idBw.svg"]'
        )
            .parent()
            .click({ force: true, multiple: true });
        cy.wait(3300);
        cy.get(
            'svg [href="https://api.back2street.de/storage/images/mYs8Yn2xaO93PfuFiSEQl2tqV6Vp3EYXUBQ5idBw.svg"]'
        )
            .parent()
            .click({ force: true, multiple: true });
        cy.wait(2900);
        cy.get(
            'svg [href="https://api.back2street.de/storage/images/mYs8Yn2xaO93PfuFiSEQl2tqV6Vp3EYXUBQ5idBw.svg"]'
        )
            .parent()
            .click({ force: true, multiple: true });
    };
    it("Tests getting >= 10 points and sending the highscore", () => {
        cy.visit("/gaming-screen");
        cy.url().should("eq", `${Cypress.config().baseUrl}/gaming-screen`);

        // timer counting down from 3 to 0 is visible in the beginning
        cy.get("circle").should("be.visible");
        cy.get(".countDownText").should("be.visible");
        cy.wait(3200);
        // waits until the first row has reached the bottom and the game is over.
        cy.wait(5000);

        // score should be 0
        // check
        // makes >= 10 points
        makePoints();
        // score should be >= 10
        // lose game
        cy.wait(4500);
        // send highscore
        cy.url().should("eq", `${Cypress.config().baseUrl}/score-screen`);
        // clicking on Highscore abschicken! sends us to result-screen
        cy.get("div").contains("Highscore abschicken!").should("exist");
        cy.get("div").contains("Highscore abschicken!").click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/result-screen`);
        // we should have won a coupon
        cy.get(".title").contains("Gewonnen!").should("exist");
    });
    */
});
