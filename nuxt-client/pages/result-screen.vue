<template>
    <!-- @file page that will be displayed after we sent our result to the main backend server  -->
    <div>
        <div class="p-4 flex flex-col h-screen justify-start items-center">
            <div v-if="$fetchState.pending" class="loading-result">
                <!-- TODO(pierre): add loading-spinner component here -->
                Das Ergebnis wird geladen...
            </div>
            <div v-else-if="$fetchState.error">
                Sending your highscore did throw an error! Contact the support.
            </div>
            <div
                v-else
                class="
                    finished-loading
                    flex flex-col
                    justify-center
                    items-center
                    text-center
                "
            >
                <div
                    v-if="wonACoupon"
                    class="
                        flex flex-col
                        justify-center
                        items-center
                        text-center
                    "
                >
                    <div class="title font-semibold text-lg">Gewonnen!</div>
                    <div class="text mt-8"></div>
                    <CouponCard
                        :coupons="coupons"
                        :caption="`Glückwunsch! Du hast dir den folgenden Coupon erspielt!`"
                        :sponsor-name="sponsorName"
                    />
                    <div class="redirect-notification mt-4">
                        Diesen Coupon kannst du bei {{ sponsorName }} einlösen!
                        Auslesen kannst du den Code auf unserer Hauptseite.
                    </div>
                </div>
                <div v-else class="flex flex-col justify-center text-center">
                    <div class="title font-semibold text-lg">Schade!</div>
                    <div class="text mt-8">
                        Dein Score war leider zu niedrig um einen Coupon bei

                        <div class="sponsor font-semibold">
                            {{ sponsorName }}
                        </div>

                        zu gewinnen!
                    </div>
                    <div class="redirect-notification mt-8">
                        Leider hat es heute nicht geklappt. Wenn noch Coupons
                        vorhanden sind, kannst du jedoch direkt erneut versuchen
                        bei einen Coupon zu gewinnen!
                    </div>
                </div>

                <div
                    class="
                        redirection-counter
                        time
                        mt-8
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
                <section class="mt-4">
                    Wir leiten dich auf die Hauptseite zurück.
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import magicTilesButton from "~/components/MagicTilesButton.vue";
import CouponItem from "~/components/CouponItem.vue";
import { gameInfoStore } from "~/store";
import { GameInfoStorage } from "~/utils/GameInfoStorage";

@Component({
    name: "ResultScreen",
    layout: "result",
    components: {
        magicTilesButton,
        CouponItem,
    },
})
export default class ResultScreen extends Vue {
    // time it will take the user to be redirected to the main server page
    countDownDuration: number = 10;

    async fetch() {
        await gameInfoStore.sendHighscore();
    }

    async mounted() {
        GameInfoStorage.cleanUpStorage();
        await this.countToZero();
        window.location.href = "http://back2street.de";
    }

    /**
     * @description Using this function to be able to reuse the CouponCard component.
     */
    get coupons() {
        const arrayWithOneCoupon = [];
        arrayWithOneCoupon.push(this.couponTheUserWon);
        return arrayWithOneCoupon;
    }

    get couponTheUserWon() {
        return gameInfoStore.getCouponTheUserWon;
    }

    get wonACoupon(): boolean {
        return this.couponTheUserWon !== null;
    }

    get sponsorName() {
        return gameInfoStore.currentSponsor;
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
