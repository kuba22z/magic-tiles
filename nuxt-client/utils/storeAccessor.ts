import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import coupons from "~/store/coupons";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let couponStore: coupons;

function initialiseStores(store: Store<any>): void {
    couponStore = getModule(coupons, store);
}

export { initialiseStores, couponStore };
