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
            <div v-else-if="$fetchState.done" class="finished-loading">
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
                        :image="coupon.image_url"
                        :description="coupon.description"
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

@Component({
    name: "ResultScreen",
    components: {
        magicTilesButton,
        CouponItem,
    },
})
export default class ResultScreen extends Vue {
    async fetch() {
        // debug fetch 2 seconds. TODO(pierre): delete this once finished.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("fetched.");
    }
}
</script>

<style scoped></style>
