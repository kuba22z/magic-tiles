<template>
    <svg :x="rect.x + '%'" :y="rect.y + '%'">
        <rect fill="black" height="25%" width="25%" />
        <!--    TODO(jakub) BUG: on firefox some images flicker between cook-book.svg and book.svg -->
        <image :href="'_nuxt/assets/' + rect.image" height="25%" width="25%" />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Rect } from "~/types/game-board";

@Component
export default class gamingRectangle extends Vue {
    @Prop() public rect!: Rect;
}
</script>

<style scoped></style>
