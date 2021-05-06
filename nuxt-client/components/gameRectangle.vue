<template>
    <svg :y="rect.y + '%'" :x="rect.x + '%'">
        <rect fill="black" height="25%" width="25%" />
        <image :href="rect.image" height="25%" width="25%" />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Rect } from "~/types/interfaces/gaming-screen";

@Component
export default class gamingRectangle extends Vue {
    @Prop() public rect!: Rect;
}
</script>

<style scoped></style>
