<template>
    <div>
        <div class="p-4 flex h-screen justify-center items-center">
            <div class="flex justify-center-items-center">
                <div v-if="!validationFetched">
                    <div class="loadng-spinner">Validating...</div>
                </div>
                <div v-else-if="!validationSuccessful">
                    <div
                        class="
                            flex flex-col
                            justify-center
                            items-center
                            text-center
                        "
                    >
                        <div
                            class="
                                caption
                                text-lg
                                font-semibold
                                text-backtostreet-blue
                            "
                        >
                            Die Validierung war nicht erfolgreich.
                        </div>
                        <div
                            class="
                                redirection-counter
                                time
                                mt-4
                                px-3
                                py-3
                                border-solid border-black border-2
                                rounded-full
                                bg-white
                                justify-center
                            "
                            style="width: 55px"
                        >
                            <div
                                class="
                                    flex
                                    justify-center
                                    font-extrabold
                                    text-xl text-backtostreet-blue
                                "
                                style="font-family: Amatic SC, serif"
                            >
                                {{ countDownDuration }}
                            </div>
                        </div>
                        <div class="description text-backtostreet-blue">
                            <section class="text-center mt-8">
                                Du musst eingeloggt sein um einen Coupon
                                gewinnen zu können.
                            </section>
                            <section class="mt-4">
                                Wir leiten dich auf die Hauptseite zurück, dort
                                kannst du dich einloggen.
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { gameInfoStore } from "~/store";
import { ValidationInfo } from "~/types/gameInfo";
import { GameInfoStorage } from "~/utils/gameInfoStorage";

@Component({
    name: "Validation",
    layout: "result",
})
export default class Validation extends Vue {
    queryParams: any;
    // whether the validation request was already sent and received.
    validationFetched: boolean = false;
    validationSuccessful: boolean = false;
    // time it will take the user to be redirected to either the landing or the
    // main page
    countDownDuration: number = 10;

    /**
     * @description gets route params on initial page load.
     */
    asyncData({ route }: Context) {
        return {
            queryParams: route.query,
        };
    }

    async mounted() {
        try {
            const response: AxiosResponse = await this.$axios.post(
                "/api/api/v1/activities/validate",
                {
                    activity_id: Number(this.queryParams.activity_id),
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.queryParams.token}`,
                    },
                }
            );
            // NOTE(pierre): have to set validationInfo properties on a seperate call
            // since they are given by query params and not by the api response.
            const validUntil: Date = new Date(this.queryParams.expires_at);
            const playTime: Date = this.calculatePlayTime(validUntil);
            const validationInfo: ValidationInfo = {
                activityId: this.queryParams.activity_id,
                authToken: this.queryParams.token,
                tokenDuration: playTime,
            };
            gameInfoStore.initializeGameInfo({
                gameInfo: response.data,
                validationInfo,
            });
            this.validationSuccessful = true;
        } catch (e) {
            console.log(
                "Error when trying to validate the user in validate.vue."
            );
            console.log(e);
            this.validationSuccessful = false;
        }
        this.validationFetched = true;

        if (this.validationSuccessful) {
            GameInfoStorage.initStorageFromStore();
            this.redirectToGameStartPage();
            return;
        }

        await this.countToZero();
        this.redirectToMainPage();
    }

    /**
     * @param validUntil: Date object until the given token will be accepted by
     * the main backend api.
     * @description calculates the duration we allow the player to play our game.
     */
    calculatePlayTime(validUntil: Date): Date {
        const sixMinutesInMillis: number = 1000 * 60 * 6;
        const tenSecondsInMillis: number = 1000 * 10;
        const inSixMinutes: Date = new Date(Date.now() + sixMinutesInMillis);
        // returns validUntil if it is smaller than 6 minutes. else returns
        // inSixMinutes.
        if (inSixMinutes > validUntil) {
            // decreases valid until by 10 seconds because when we end the game
            // when timer hits 0:00 we still have to have a valid token that we
            // can use communicate with the backend api and send the highscore.
            return new Date(Date.now() - tenSecondsInMillis);
        } else {
            return inSixMinutes;
        }
    }

    /**
     * @description Redirects the user to the first page of our game. User will only
     * be redirected if he did validate with his token before.
     */
    redirectToGameStartPage() {
        this.$router.push({
            path: "/",
        });
    }

    /**
     * @description Redirects the user to the main page after the validation
     * failed.
     */
    redirectToMainPage() {
        window.location.href = "https://back2street.de";
    }

    /**
     * @description Counts from the starting value down to zero.
     * Counting unit is in seconds.
     */
    async countToZero(): Promise<any> {
        while (this.countDownDuration > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.countDownDuration--;
        }
    }
}
</script>

<style scoped></style>
