<!-- Component serves a generic styling template for all buttons -->
<template>
    <NuxtLink
        v-if="buttonType === 'nuxtlink'"
        class="
            button
            rounded-2xl
            h-12
            w-36
            items-center
            justify-center
            flex
            text-lg text-white
            bg-backtostreet-blue
            hover:bg-backtostreet-lightblue
        "
        :to="linkTo"
    >
        <div class="text-center font-bold">
            {{ text }}
        </div>
    </NuxtLink>

    <button
        v-else-if="buttonType === 'href'"
        class="
            button
            rounded-2xl
            h-12
            w-36
            items-center
            justify-center
            flex
            text-lg text-white
            bg-backtostreet-blue
            hover:bg-backtostreet-lightblue
        "
    >
        <a :href="linkTo">
            <div class="text-center font-bold">
                {{ text }}
            </div>
        </a>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class magicTilesButton extends Vue {
    @Prop({ default: "/" }) linkTo!: string;
    @Prop(String) text!: string;
    @Prop({ default: "nuxtlink" }) buttonType!: string;
}
</script>

<style scoped></style>
