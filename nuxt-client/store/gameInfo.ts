import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Coupons, GameInfo, MagicTilesData } from "~/types/gameInfo";
import { TimerUtils } from "~/utils/timerUtils";
import { defaultCorrectBook, defaultFalseImages } from "~/assets/rectImages";

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
    correctImage: string = defaultCorrectBook;
    falseImages: string[] = defaultFalseImages;
    gameMaxLevel: number = 0;
    // TODO(pierre): currently it is hardcoded "{baseUrl}..."? Ask main backend
    // team to fix this.
    redirectUrl: string = "";
    // used for our countdown timer
    validUntil: Date | null = null;

    /**
     * @description Initializes the game data that we got from the main
     * server backend. Will be called from the validation page after the
     * validation did succeed.
     */
    @VuexMutation
    initializeGameInfo(gameInfo: GameInfo) {
        this.userValidated = true;
        const gameData: MagicTilesData = gameInfo.game_data;
        this.correctImage = gameData.correctImage;
        this.falseImages = gameData.falseImages;
        this.gameMaxLevel = gameInfo.game_max_level;
        this.coupons = gameInfo.coupon_types;
    }

    /**
     * @description Sets the duration until when our current token is valid.
     * We get this information from the get param in the /validate route.
     * MAYBE(pierre): ask backend team to move it into gameInfo response after
     * validating. Instead of get params on /validate page. Will avoid the
     * problem that users can set their own validUntil timestamp in get param.
     * @param validUntil String in datetime format.
     */
    @VuexMutation
    setTokenDuration(validUntil: Date) {
        this.validUntil = validUntil;
    }

    get getSecondsLeft(): number {
        if (this.validUntil === null) {
            return 0;
        }
        console.log("store called.");
        console.log("current date:");
        console.log(new Date().toString());
        return (
            TimerUtils.getTimeInSeconds(this.validUntil) -
            TimerUtils.getTimeInSeconds(new Date())
        );
    }

    get getValidUntil(): Date | null {
        return this.validUntil;
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
