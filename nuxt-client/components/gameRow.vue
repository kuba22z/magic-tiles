<template>
    <g>
        <GameRectangle
            v-for="(rect, index) in rectRow.row"
            :key="index"
            :rect="rect"
        />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameRectangle from "~/components/gameRectangle.vue";
import { RectRow } from "~/types/game-board";

@Component({
    components: { GameRectangle },
})
export default class gamingRectangle extends Vue {
    @Prop() public rectRow!: RectRow;
}
</script>

<style scoped></style>
