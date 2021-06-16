import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import gameInfo from "~/store/gameInfo";
import gamingScreen from "~/store/gamingScreen";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let gameInfoStore: gameInfo;
// eslint-disable-next-line import/no-mutable-exports
let gamingScreenStore: gamingScreen;

function initialiseStores(store: Store<any>): void {
    gameInfoStore = getModule(gameInfo, store);
    gamingScreenStore = getModule(gamingScreen, store);
}

export { initialiseStores, gameInfoStore, gamingScreenStore };
