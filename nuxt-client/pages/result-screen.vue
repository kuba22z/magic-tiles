<template>
    <!-- @file page that will be displayed after we sent our result to the main backend server  -->
    <div>
        <div class="page flex flex-col justify-center items-center text-center">
            <div v-if="$fetchState.pending" class="loading-result">
                loading the result...
            </div>
            <div v-else-if="$fetchState.error">
                Sending your highscore did throw an error! Contact the support.
            </div>
            <div v-else class="finished-loading">
                <div
                    v-if="wonACoupon"
                    class="
                        flex flex-col
                        justify-center
                        items-cetner
                        text-center
                    "
                >
                    <div class="success-text">
                        Glückwunsch! Du konntest den folgenden Coupon gewinnen!
                    </div>
                    <CouponItem
                        v-if="couponTheUserWon !== null"
                        :image="couponTheUserWon.image_url"
                        :description="couponTheUserWon.description"
                    />
                    <div class="redirect-notification">
                        Du kannst nun auf back2street.de den Couponcode
                        auslesen. Mit dem Code kannst du nun bei
                        {{ currentSponsor }} einkaufen!
                    </div>
                </div>
                <div v-else>
                    <div class="no-coupon-text">
                        Schade! Mit deinem Score hast du keinen Coupon gewinnen
                        können.
                    </div>
                    <div class="redirect-notification">
                        Leider hat es heute nicht geklappt. Wenn noch Coupons
                        vorhanden sind, kannst du jedoch direkt erneut versuchen
                        bei {{ currentSponsor }} einen Coupon zu gewinnen!
                    </div>
                </div>
                <div class="redirect-timer">
                    Wir leiten dich automatisch zurück in
                    {{ countDownDuration }}...
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import magicTilesButton from "~/components/magicTilesButton.vue";
import CouponItem from "~/components/couponItem.vue";
import { gameInfoStore } from "~/store";

@Component({
    name: "ResultScreen",
    components: {
        magicTilesButton,
        CouponItem,
    },
})
export default class ResultScreen extends Vue {
    // time it will take the user to be redirected to either the landing or the
    // main page
    countDownDuration: number = 5;

    async fetch() {
        await gameInfoStore.sendHighscore();
    }

    async mounted() {
        await this.countToZero();
        window.location.href = "http://back2street.de";
    }

    get couponTheUserWon() {
        return gameInfoStore.getCouponTheUserWon;
    }

    get wonACoupon(): boolean {
        return this.couponTheUserWon !== null;
    }

    get currentSponsor() {
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
