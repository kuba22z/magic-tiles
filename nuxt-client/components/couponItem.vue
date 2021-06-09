<template>
    <div>
        <div
            class="
                couponDisplay
                mt-2
                flex
                justify-center
                items-center
                text-center
                w-full
                h-40
            "
        >
            <div
                class="
                    image
                    flex
                    h-40
                    w-40
                    description
                    justify-center
                    items-center
                    text-center
                "
            >
                <img :src="image" alt="image of a coupon." />
            </div>
            <div
                class="description flex justify-center items-center text-center"
            >
                {{ description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class CouponItem extends Vue {
    // TODO(pierre): read about prop validator, and type checks.
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
