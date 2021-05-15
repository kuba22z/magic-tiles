<template>
    <div>
        <div class="test">
            we have: {{ availableCouponsCount }} available coupons.
        </div>
        <div class="test">
            <template v-for="coupon in coupons">
                <div :key="coupon.level" class="coupon">
                    <div class="level">
                        coupon data: level: {{ coupon.level }}
                    </div>
                    <div class="description">
                        description:
                        {{ coupon.description }}
                    </div>
                    <div class="image-link">
                        image link:
                        {{ coupon.image }}
                    </div>
                </div>
            </template>
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
    }

    get availableCouponsCount(): number {
        return couponStore.getAmountAvailableCoupons;
    }

    get coupons(): Coupons {
        return couponStore.getAllCoupons;
    }

    get couponsFetched(): boolean {
        return couponStore.couponsFetched;
    }
}
</script>

<style scoped></style>
