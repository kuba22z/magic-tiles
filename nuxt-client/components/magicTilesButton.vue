<!-- Component serves a generic styling template for all buttons -->
<template>
    <NuxtLink
        v-if="buttonType === 'nuxtlink'"
        :to="linkTo"
        :class="[
            'rounded-2xl',
            'h-full',
            'w-' + fixedWidth,
            'items-center',
            'justify-center',
            'text-lg',
            /*MAYBE(jakub)  'bg-'+color+'-600',*/
            'ring-2',
            'ring-' + color + '-600',
            'hover:bg-' + color + '-600',
        ]"
    >
        <div class="mx-1 mt-2.5 mb-3 text-center font-bold shadow-md">
            {{ text }}
        </div>
    </NuxtLink>

    <button
        v-else-if="buttonType === 'href'"
        :class="[
            'rounded-2xl',
            'h-full',
            'w-' + fixedWidth,
            'items-center',
            'justify-center',
            'text-lg',
            /*MAYBE(jakub)  'bg-'+color+'-600',*/
            'ring-2',
            'ring-' + color + '-600',
            'hover:bg-' + color + '-600',
        ]"
    >
        <a :href="href">
            <div class="mx-1 mt-2.5 mb-2 text-center font-bold shadow-md">
                {{ text }}
            </div>
        </a>
    </button>
    <!-- MAYBE(pierre): leave or remove error case -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class magicTilesButton extends Vue {
    @Prop({ default: "/" }) linkTo!: string;
    @Prop({ default: "http://back2street.de/" }) href!: string;
    @Prop({ default: "green" }) color!: string;
    @Prop(String) text!: string;
    @Prop({ default: "full" }) fixedWidth!: string;
    @Prop({ default: "nuxtlink" }) buttonType!: string;
}
</script>

<style scoped></style>
