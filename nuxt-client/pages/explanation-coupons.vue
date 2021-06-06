<template>
    <div>
        <div v-if="anyCouponsAvailable" class="coupon-card">
            <template v-for="(coupon, index) in coupons">
                <CouponItem
                    :key="index"
                    :image="coupon.image_url"
                    :description="coupon.description"
                />
            </template>
        </div>
        <div v-else class="mt-6 no-coupons-card">
            <div
                class="flex flex-col justify-center items-center text-center mx-4"
            >
                <div class="mt text-lg sorry">
                    Zu spät! Für dieses Spiel gibt es leider bereits keine
                    Coupons mehr!
                </div>
                <div class="mt-4 text-lg play">
                    Du kannst die Zeit jedoch trotzdem nutzen um versuchen
                    deinen aktuellen Highscore zu schlagen!
                </div>
            </div>
        </div>

        <div
            class="bottom-navigation-buttons flex items-center mt-4 justify-center w-full"
        >
            <div
                class="flex items-center justify-center w-full buttons space-x-2 mb-6"
            >
                <div
                    class="back-button h-12 w-36 flex justify-center items-center text-center"
                >
                    <MagicTilesButton
                        text="Zurück"
                        link-to="/"
                        button-type="nuxtlink"
                        color="green"
                    />
                </div>
                <div
                    class="next-button h-12 w-36 flex justify-center items-center text-center"
                >
                    <MagicTilesButton
                        text="Verstanden!"
                        link-to="/gaming-screen"
                        button-type="nuxtlink"
                        color="green"
                    />
                </div>
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
