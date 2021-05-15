<template>
    <div>
        <div class="coupon-card">
            <div
                v-if="$fetchState.pending"
                class="display-while-fetching-request"
            >
                <!-- TODO(pierre): display loading spinner while pending. -->
                Loading your available coupons...
            </div>
            <div
                v-else-if="$fetchState.error"
                class="error-while-fetching-request"
            >
                <!-- TODO(pierre): create and display funny image for fetch error -->
                We got an error loading your coupons :O
            </div>
            <div v-else-if="anyCouponsAvailable">
                <div class="fetched">coupons fetched: {{ couponsFetched }}</div>
                <div class="amount">
                    amount available coupons: {{ amountAvailableCoupons }}
                </div>
                <template v-for="coupon in coupons">
                    <div :key="coupon.level" class="couponinfo">
                        <div class="level">
                            coupon level: {{ coupon.level }}
                        </div>
                        <div class="image">
                            coupon image: {{ coupon.image }}
                        </div>
                        <div class="description">
                            coupon description: {{ coupon.description }}
                        </div>
                    </div>
                </template>
            </div>
            <div v-else>
                <div class="sorry">
                    Sorry, to late! There are no more available coupons for the
                    given store anymore...
                </div>
                <div class="play">
                    You can still enjoy this game and try to break the
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
import { couponStore } from "~/store";
import { Coupons } from "~/types/coupons";

@Component
export default class CouponsExplanation extends Vue {
    /**
     * @description queries our api and stores the information inside our store.
     */
    async fetch() {
        await couponStore.fetchCoupons();
        // sleeps for two seconds to check the pending state. remove later.
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    get amountAvailableCoupons(): number {
        return couponStore.getAmountAvailableCoupons;
    }

    get coupons(): Coupons {
        return couponStore.getAllCoupons;
    }

    get couponsFetched(): boolean {
        return couponStore.couponsFetched;
    }

    get anyCouponsAvailable(): boolean {
        return this.amountAvailableCoupons > 0;
    }
}
</script>

<style scoped></style>
