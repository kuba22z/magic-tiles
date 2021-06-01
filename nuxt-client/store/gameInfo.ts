import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Coupons, GameInfo, MagicTilesData } from "~/types/gameInfo";

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
    coupons: Coupons = [];
    correctImage: string = "";
    falseImages: string[] = [];
    // TODO(pierre): why is this set to four in the api response we get?
    gameMaxLevel: number = 0;
    // TODO(pierre): currently it is hardcoded "{baseUrl}..."? Ask main backend
    // team to fix this.
    redirectUrl: string = "";

    /**
     * @description Initializes the game data that we got from the main
     * server backend. Will be called from the validation page after the
     * validation did succeed.
     */
    @VuexMutation
    initializeGameInfo(gameInfo: GameInfo) {
        this.userValidated = true;
        // parses escaped json string(format of the api response) to json object.
        const gameData: MagicTilesData = JSON.parse(gameInfo.game_data);
        console.log(gameData);
        this.correctImage = gameData.gameload1.object1_img;
        this.falseImages.push(gameData.gameload1.object2_img);
        this.falseImages.push(gameData.gameload1.object3_img);
        this.gameMaxLevel = gameInfo.game_max_level;
        this.coupons = gameInfo.coupon_types;
    }

    get getCoupons(): Coupons {
        return this.coupons;
    }

    get getCorrectImage(): string {
        return this.correctImage;
    }

    get getFalseImages(): string[] {
        return this.falseImages;
    }
}
