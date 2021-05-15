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

    /**
     * @description calls the main server to get all the game infos that we need.
     */
    @VuexAction({ commit: "initializeCoupons", rawError: true })
    async fetchCoupons() {
        console.log("fetching request...");
        // TODO(pierre): include api token in request once the main server api
        // is implemented.
        // TODO(pierre): Ask karbush and rias if we will have
        // one route for gameInfo? Or one for coupons and one for the game info?
        try {
            const response: AxiosResponse = await $axios.get(
                "http://localhost:3001/gameInfo"
            );
            const gameInfo: GameInfo = response.data;
            // TODO(pierre): remove console.log after debugging.
            // eslint-disable-next-line no-console
            console.log("Fetching the api was successful.");
            return gameInfo;
        } catch (e) {
            // TODO(pierre): remove console.log after debugging.
            // eslint-disable-next-line no-console
            console.log("Fetching the api did throw an error.");
            return [];
        }
    }

    /**
     * @description Initializes our coupon store based on game info we got from
     * our api request.
     * @param gameInfo
     */
    @VuexMutation
    initializeCoupons(gameInfo: GameInfo) {
        this.amountAvailableCoupons = gameInfo.availableCoupons;
        this.coupons = gameInfo.coupons;
        this.couponsFetched = false;
        console.log(gameInfo);
    }
}
