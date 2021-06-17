import {
    Module,
    VuexAction,
    VuexModule,
    VuexMutation,
} from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { gamingScreenStore } from "~/store";
import {
    Coupon,
    Coupons,
    GameInfo,
    MagicTilesData,
    resultingCoupon,
} from "~/types/gameInfo";
import { TimerUtils } from "~/utils/timerUtils";
import {
    defaultCorrectBook,
    defaultFalseImages,
} from "~/assets/rectImages/rectImages";
import { $axios } from "~/utils/api";
import { GameLogic } from "~/utils/GameLogic";

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
    couponTheUserWon: Coupon | null = null;
    noCouponWonMessage: string = "";
    correctImage: string = defaultCorrectBook;
    falseImages: string[] = defaultFalseImages;
    currentSponsor: string = "no sponsor was given.";
    gameMaxLevel: number = 5;
    // TODO(pierre): currently it is hardcoded "{baseUrl}..."? Ask main backend
    // team to fix this.
    redirectUrl: string = "";
    // used for our countdown timer
    validUntil: Date | null = null;
    // used to authenticate with the main backend
    authToken: string | null = null;
    activityId: number | null = null;

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
        this.currentSponsor = gameInfo.sponsor_name;
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

    @VuexMutation
    setAuthToken(token: string) {
        this.authToken = token;
    }

    @VuexMutation
    setActivityId(id: number) {
        this.activityId = id;
    }

    @VuexAction({ commit: "setWinningCoupon" })
    async sendHighscore() {
        const highscore = gamingScreenStore.getSessionHighscore;
        const reachedLevel = GameLogic.computeReachedLevel(highscore);
        try {
            // throw new Error("test error case.");
            const response: AxiosResponse = await $axios.put(
                "/api/api/v1/activities",
                {
                    activity_id: Number(this.activityId),
                    score: highscore,
                    reached_level: reachedLevel,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.authToken}`,
                    },
                }
            );
            return response.data;
        } catch (e) {
            console.log("Error when calling fetch() on validate.vue.");
            console.log("error:");
            console.log(e);
        }
    }

    /**
     * @description Sets the message we display when the user did not win a
     * coupon or the coupon he won, depending on the backend response.
     */
    @VuexMutation
    setWinningCoupon(backendResponse: resultingCoupon) {
        if (backendResponse?.message !== undefined) {
            this.noCouponWonMessage = backendResponse.message;
            return;
        }
        if (backendResponse?.coupon !== undefined) {
            this.couponTheUserWon = backendResponse?.coupon;
        }
    }

    get getCurrentSponsor(): string {
        return this.currentSponsor;
    }

    get getSecondsLeft(): number {
        if (this.validUntil === null) {
            return 0;
        }
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

    get getCouponTheUserWon(): Coupon | null {
        return this.couponTheUserWon;
    }

    get getGameMaxLevel(): number {
        return this.gameMaxLevel;
    }
}
