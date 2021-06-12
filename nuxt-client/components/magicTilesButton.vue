<!-- Component serves a generic styling template for all buttons -->
<template>
    <!-- TODO(pierre): define own class for color
            backtostreet-blue' and backtostreet-blue-hover -->
    <NuxtLink
        v-if="buttonType === 'nuxtlink'"
        class="
            button
            rounded-2xl
            h-full
            w-full
            items-center
            justify-center
            flex
            text-lg text-white
            bg-backtostreet-blue
            hover:bg-backtostreet-lightblue
        "
        :to="linkTo"
    >
        <div class="flex justify-center items-center text-center font-bold">
            {{ text }}
        </div>
    </NuxtLink>

    <button
        v-else-if="buttonType === 'href'"
        class="
            button
            rounded-2xl
            h-full
            w-full
            items-center
            justify-center
            flex
            text-lg text-white
            bg-backtostreet-blue
            hover:bg-backtostreet-lightblue
        "
    >
        <a :href="href">
            <div>
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
    @Prop({ default: "http://back2street.de/" }) href!: string;
    @Prop(String) text!: string;
    @Prop({ default: "nuxtlink" }) buttonType!: string;
}
</script>

<style scoped></style>
