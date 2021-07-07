<template>
    <div
        class="
            coupon
            flex flex-col
            justify-center
            items-center
            border-4 border-solid border-backtostreet-blue
            rounded-xl
        "
    >
        <img
            class="w-60 h-32 rounded-t-lg"
            :src="image"
            alt="Bild eines Coupons"
        />
        <div
            class="description flex justify-center items-center text-center m-2"
        >
            {{ description }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class CouponItem extends Vue {
    /**
     * The image that will be displayed.
     */
    @Prop({ type: String, required: true }) image!: string;
    /**
     * The description that will be displayed.
     */
    @Prop({ type: String, required: true }) description!: string;
}
</script>

<style scoped></style>
