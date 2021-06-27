/**
 * @file Utility that handles storeing api infos and game state in localstorage
 * and retrieving these from localstorage. Is used so that when we refresh the page
 * we will still be validated and have all the game data (if we had it before).
 */

import { gameInfoStore, gamingScreenStore } from "~/store";

export class GameInfoStorage {
    /**
     * @description returns false if localstorage is not initialized or it is null. Else
     * returns true.
     */
    public static storageInitialized(): boolean {
        return !!localStorage.getItem("initialized");
    }

    /**
     * @description Takes current values from store and stores them client side
     * in localstorage.  Used so that when the client does refresh the page (F5)
     * he is still validated etc..
     */
    public static initStorageFromStore() {
        const validationInfo = gameInfoStore.getValidationInfo;
        const gameInfo = gameInfoStore.getGameInfo;
        localStorage.setItem("validationInfo", JSON.stringify(validationInfo));
        localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
        localStorage.setItem("initialized", "true");
    }

    /**
     * @description Takes current values from localstorage and loads them into stores.
     * Used after the user does refresh the page (F5) to apply current values.
     */
    public static initStoreFromStorage() {
        const validationInfo = JSON.parse(
            localStorage.getItem("validationInfo") ?? ""
        );
        const gameInfo = JSON.parse(localStorage.getItem("gameInfo") ?? "");
        if (validationInfo === "" || gameInfo === "") {
            // TODO(pierre): throw error here.
            console.log("GameInfo or ValidationInfo is empty. ERROR");
        }
        gameInfoStore.initializeGameInfo({ gameInfo, validationInfo });
        gamingScreenStore.setSessionHighscore(
            parseInt(localStorage.getItem("sessionHighscore") ?? "0")
        );
    }

    public static updateStorageWithHighscore(score: number) {
        localStorage.setItem("sessionHighscore", score.toString());
    }

    /**
     * @description Cleans up all localstorage. Called when we redirect the user
     * to the main backtostreet page.
     */
    public static cleanUpStorage() {
        localStorage.clear();
    }
}
