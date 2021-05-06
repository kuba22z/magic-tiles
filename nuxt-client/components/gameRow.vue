<template>
    <g>
        <GameRectangle v-for="rect in rectRow.array" :rect="rect" />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
@Component({
    components: { GameRectangle },
})
export default class gamingRectangle extends Vue {
    @Prop() public rectRow!: RectArray<Rect>;
}
</script>

<style scoped></style>
