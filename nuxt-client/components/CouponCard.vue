<template>
    <div>
        <div
            v-if="haveAnyCoupons"
            class="flex flex-col justify-start items-center"
        >
            <div class="caption text-center text-lg font-semibold">
                {{ caption }}
            </div>
            <div
                v-for="(coupon, index) in coupons"
                :key="index"
                class="all-coupons mt-4"
            >
                <CouponItem
                    :image="coupon.image_url"
                    :description="coupon.description"
                />
            </div>
        </div>
        <div v-else>
            <div class="caption">Zu spät!</div>
            <div class="description">
                Leider waren die Coupons für unseren Sponsor
                <div class="sponsor font-semibold">
                    {{ sponsorName }}
                </div>
                zu begehrt. Sie sind schon alle aufgebraucht!
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Coupons } from "~/types/gameInfo";
import CouponItem from "~/components/CouponItem.vue";

@Component({
    name: "CouponCard",
    components: {
        CouponItem,
    },
})
export default class CouponCard extends Vue {
    /**
     * @description The coupons that will be displayed.
     */
    @Prop() coupons!: Coupons;
    /**
     * @description Name of the sponsor for the coupons in the coupons card.
     */
    @Prop() sponsorName!: string;
    /**
     * @description The caption that will be displayed at the top of this component.
     */
    @Prop() caption!: string;

    get haveAnyCoupons() {
        if (this.coupons === undefined) {
            return false;
        }

        return this.coupons.length > 0;
    }
}
</script>

<style scoped></style>
