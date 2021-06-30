<template>
    <div>
        <div class="p-4 flex flex-col h-screen items-center">
            <CouponCard
                :caption="`Die folgenden Coupons gibt es zu gewinnen`"
                :coupons="coupons"
                :sponsor-name="sponsorName"
            />
            <div
                class="
                    bottom-navigation-buttons
                    flex
                    mt-4
                    justify-center
                    items-end
                    align-bottom
                    w-full
                    h-full
                    space-x-2
                "
            >
                <MagicTilesButton
                    text="Zurück"
                    link-to="/sponsor"
                    button-type="nuxtlink"
                />
                <MagicTilesButton
                    text="Verstanden!"
                    link-to="/gaming-screen"
                    button-type="nuxtlink"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { gameInfoStore } from "~/store";
import { Coupons } from "~/types/gameInfo";
import MagicTilesButton from "~/components/MagicTilesButton.vue";
import CouponCard from "~/components/CouponCard.vue";

@Component({
    name: "CouponsExplanation",
    components: {
        CouponCard,
        MagicTilesButton,
    },
})
export default class CouponsExplanation extends Vue {
    get coupons(): Coupons {
        return gameInfoStore.getCoupons;
    }

    get sponsorName(): string {
        return gameInfoStore.getCurrentSponsor;
    }
}
</script>

<style scoped></style>
