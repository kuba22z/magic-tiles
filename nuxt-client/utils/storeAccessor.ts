import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import gameInfo from "~/store/gameInfo";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let gameInfoStore: gameInfo;

function initialiseStores(store: Store<any>): void {
    gameInfoStore = getModule(gameInfo, store);
}

export { initialiseStores, gameInfoStore };
