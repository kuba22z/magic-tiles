import {
    Module,
    VuexModule,
    VuexMutation,
    VuexAction,
} from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { $axios } from "~/utils/api";
import { Coupons } from "~/types/coupons";
import { GameInfo } from "~/types/gameInfo";

/**
 * @description Store that is used to store the internal state for our coupons.
 */
@Module({
    name: "coupons",
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

    @VuexAction({ commit: "initializeCoupons" })
    /**
     * @description calls the main server to get all the game infos that we need.
     */
    async fetchCoupons() {
        // TODO(pierre): find out why axios is undefined?
        console.log("axios:");
        console.log($axios);
        // TODO(pierre): include api token in request once the main server api
        // is implemented.
        // TODO(pierre): Ask karbush and rias if we will have
        // one route for gameInfo? Or one for coupons and one for the game info?
        try {
            const response: AxiosResponse = await $axios.post(
                "127.0.0.1:3001/gameInfo"
            );
            const gameInfo: GameInfo = response.data;
            // TODO(pierre): remove console.log after debugging.
            // eslint-disable-next-line no-console
            console.log("Fetching the api was successful.");
            console.log("we got response:");
            console.log(response);
            return gameInfo;
        } catch (e) {
            // TODO(pierre): remove console.log after debugging.
            // eslint-disable-next-line no-console
            console.log("Fetching the api did throw an error.");
            // TODO(pierre): remove printing the error message.
            console.log("we got error:");
            console.log(e);
            return [];
        }
    }

    @VuexMutation
    initializeCoupons(gameInfo: GameInfo) {
        this.setAmountAvailableCoupons(gameInfo.availableCoupons);
        this.setCoupons(gameInfo.coupons);
        this.setCouponsFetched(true);
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
