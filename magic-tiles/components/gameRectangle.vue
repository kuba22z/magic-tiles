<template>
    <svg :y="rect.y + '%'" :x="rect.x + '%'">
        <rect fill="red" height="25%" width="25%" />
        <image
            href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
            height="25%"
            width="25%"
        />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect } from "types/gaming-screen";

@Component
export default class gamingRectangle extends Vue {
    @Prop() public rect!: Rect;
}
</script>

<style scoped></style>
