import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import {
    CouponTypes,
    GameData,
    GameInfo,
    InternalCoupons,
    MagicTilesData,
} from "~/types/gameInfo";

/**
 * @description Helper function that formats the coupon response we get from the
 * api to match the internal coupon definition.
 */
const extractCouponsFromApiData = (
    couponTypes: CouponTypes
): InternalCoupons => {
    let allCoupons: InternalCoupons = [];
    couponTypes.forEach((couponType) =>
        couponType.coupons.forEach((coupon) =>
            allCoupons.push({
                level: couponType.level,
                description: coupon.description,
            })
        )
    );
    return allCoupons;
};

/**
 * @description Store that is used to store all game data that we get from the
 * main server.
 */
@Module({
    name: "gameInfo",
    stateFactory: true,
    namespaced: true,
})
export default class GameInfoStore extends VuexModule {
    userValidated: boolean = false;
    couponTypes: CouponTypes = [];
    coupons: InternalCoupons = [];
    correctImage: string = "";
    falseImages: string[] = [];
    // TODO(pierre): why is this set to four in the api response we get?
    gameMaxLevel: number = 0;
    // TODO(pierre): currently it is hardcoded "{baseUrl}..."? Ask main backend
    // team to fix this.
    redirectUrl: string = "";
    tilesData: MagicTilesData | null = null;

    /**
     * @description Initializes the game data that we got from the main
     * server backend. Will be called from the validation page after the
     * validation did succeed.
     */
    @VuexMutation
    initializeGameInfo(gameInfo: GameInfo) {
        this.userValidated = true;
        const gameData: GameData = gameInfo.data;
        this.tilesData = gameData.json_data;
        // TODO(pierre): CONTINUE HERE.
        // we can we not access .correctImage because it is escaped in the api response...
        // Wait for karbush and rias to fix it so I can continue with implementation.
        console.log("json data we got:");
        console.log(this.tilesData);
        console.log(this.tilesData.correctImage);
        console.log(this.tilesData.falseImages);
        this.gameMaxLevel = gameData.game_max_level;
        this.coupons = extractCouponsFromApiData(gameData.coupon_types);
        this.correctImage = gameData.json_data.correctImage;
        // TODO(pierre): add false images to store.
    }

    get getCoupons(): InternalCoupons {
        return this.coupons;
    }

    get getCorrectImage(): string {
        return this.correctImage;
    }
}
