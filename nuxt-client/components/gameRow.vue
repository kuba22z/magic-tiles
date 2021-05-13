<template>
    <g>
        <GameRectangle
            v-for="(rect, index) in rectRow.row"
            :key="index"
            :index="index"
            :rect="rect"
            :row-index="rowIndex"
            :stop-game="stopGame"
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
    @Prop() public stopGame!: any;
    @Prop() public rowIndex!: number;
}
</script>

<style scoped></style>
