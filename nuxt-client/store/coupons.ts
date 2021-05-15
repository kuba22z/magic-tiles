import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Coupons } from "~/types/coupons";

/**
 * @description Store that is used to store the internal state for our coupons.
 */
@Module({
    name: "couponStore",
    stateFactory: true,
    namespaced: true,
})
export default class CouponStore extends VuexModule {
    amountAvailableCoupons: number = 0;
    coupons: Coupons = [];
    couponsFetched: boolean = false;

    get getAmountAvailableCoupons(): number {
        return this.amountAvailableCoupons;
    }

    get getCouponsFetched(): boolean {
        return this.couponsFetched;
    }

    get getAllCoupons(): Coupons {
        return this.coupons;
    }

    @VuexMutation
    // TODO(pierre): include api token in request once the main server api is implemented.
    fetchCoupons() {
        // fetch all here
        // set available coupons here
        // set couponsFetched here
    }

    @VuexMutation
    setCouponsFetched(fetched: boolean) {
        this.couponsFetched = fetched;
    }

    @VuexMutation
    setAmountAvailableCoupons(amount: number) {
        this.amountAvailableCoupons = amount;
    }

    @VuexMutation
    setCoupons(coupons: Coupons) {
        this.coupons = coupons;
    }
}
