import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import CouponStore from "~/store/coupons";

// TODO(pierre): probably disable this rule. Discuss with jakub.
// eslint-disable-next-line import/no-mutable-exports
let couponStore: CouponStore;

function initialiseStores(store: Store<any>): void {
    couponStore = getModule(CouponStore, store);
}

export { initialiseStores, couponStore };
