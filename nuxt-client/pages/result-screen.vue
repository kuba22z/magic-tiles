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
                        congrats, you did win the following coupon!
                    </div>
                    <CouponItem
                        v-if="couponTheUserWon !== null"
                        :image="couponTheUserWon.image_url"
                        :description="couponTheUserWon.description"
                    />
                </div>
                <div v-else>
                    <div class="no-coupon-text">
                        To bad! You did not win a coupon with your score!
                    </div>
                </div>
            </div>
            <nav>
                <!-- TODO(pierre): redirect to main page once testing finished. -->
                <MagicTilesButton
                    text="Backtostreet"
                    link-to="/fake-redirect"
                    button-type="nuxtlink"
                    color="green"
                />
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import magicTilesButton from "~/components/magicTilesButton.vue";
import CouponItem from "~/components/couponItem.vue";
import { gameInfoStore, gamingScreenStore } from "~/store";

@Component({
    name: "ResultScreen",
    components: {
        magicTilesButton,
        CouponItem,
    },
})
export default class ResultScreen extends Vue {
    async fetch() {
        console.log(gamingScreenStore.getSessionHighscore);
        // debug fetch 2 seconds. TODO(pierre): delete this once finished with testing.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("fetched.");
        await gameInfoStore.sendHighscore();
        console.log("highscore sent and response received.");
    }

    get couponTheUserWon() {
        return gameInfoStore.getCouponTheUserWon;
    }

    get wonACoupon(): boolean {
        return this.couponTheUserWon !== null;
    }
}
</script>

<style scoped></style>
