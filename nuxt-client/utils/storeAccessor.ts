import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import coupons from "~/store/coupons";
import gameInfo from "~/store/gameInfo";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let couponStore: coupons;
let gameInfoStore: gameInfo;

function initialiseStores(store: Store<any>): void {
    couponStore = getModule(coupons, store);
    gameInfoStore = getModule(gameInfo, store);
}

export { initialiseStores, couponStore, gameInfoStore };
