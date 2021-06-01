<template>
    <div>
        <div class="coupon-card">
            <div v-if="anyCouponsAvailable">
                <div class="fetched">coupons fetched: {{ couponsFetched }}</div>
                <template v-for="(coupon, index) in coupons">
                    <CouponItem
                        :key="index"
                        :image="coupon.image"
                        :description="coupon.description"
                    />
                </template>
            </div>
            <div v-else>
                <div class="sorry">
                    Sorry, to late! There are no more available coupons for the
                    given store anymore...
                </div>
                <div class="play">
                    You can still enjoy this game and try to break your
                    highscore!
                </div>
            </div>
        </div>
        <div
            class="bottom-navigation-buttons flex flex-col justify-center mt-10 items-center border border-red-300 w-full"
        >
            <div
                class="next-button border border-red-300 h-12 w-24 flex justify-center items-center text-center"
            >
                <MagicTilesButton
                    text="Verstanden!"
                    link-to="/gaming-screen"
                    button-type="nuxtlink"
                    color="green"
                />
            </div>
            <div
                class="back-button mt-6 border border-red-300 h-12 w-39 flex justify-center items-center text-center"
            >
                <MagicTilesButton
                    text="Zurück"
                    link-to="/"
                    button-type="nuxtlink"
                    color="green"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { gameInfoStore } from "~/store";
import { Coupons } from "~/types/gameInfo";

@Component
export default class CouponsExplanation extends Vue {
    get coupons(): Coupons {
        return gameInfoStore.getCoupons;
    }

    get anyCouponsAvailable(): boolean {
        return this.coupons.length > 0;
    }
}
</script>

<style scoped></style>
