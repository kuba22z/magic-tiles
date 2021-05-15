<template>
    <div>
        <div class="coupon-test">
            <div class="fetched">coupons fetched: {{ couponsFetched }}</div>
            <div class="amount">
                amount available coupons: {{ amountAvailableCoupons }}
            </div>
            <template v-for="coupon in coupons">
                <div :key="coupon.level" class="couponinfo">
                    <div class="level">coupon level: {{ coupon.level }}</div>
                    <div class="image">coupon image: {{ coupon.image }}</div>
                    <div class="description">
                        coupon description: {{ coupon.description }}
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

    get amountAvailableCoupons(): number {
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
