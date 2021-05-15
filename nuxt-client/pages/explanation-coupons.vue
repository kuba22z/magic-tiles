<template>
    <div>hello</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { couponStore } from "~/store";

@Component
export default class CouponsExplanation extends Vue {
    /**
     * @description queries our api and stores the information inside our store.
     */
    async fetch() {
        console.log("our store:");
        console.log(couponStore);
        await couponStore.fetchCoupons();
    }
}
</script>

<style scoped></style>
