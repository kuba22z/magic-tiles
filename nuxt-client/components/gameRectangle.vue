<template>
    <svg :x="rect.x + '%'" :y="rect.y + '%'">
        <rect fill="black" height="25%" width="25%" />
        <!--    TODO(jakub) BUG: :href="rect.image" doesnt work properly-->
        <image
            v-if="rect.image === 'book.svg'"
            href="~/assets/book.svg"
            height="25%"
            width="25%"
        />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Rect } from "~/types/game-board";

@Component
export default class gamingRectangle extends Vue {
    @Prop(Rect) public rect!: Rect;
}
</script>

<style scoped></style>
