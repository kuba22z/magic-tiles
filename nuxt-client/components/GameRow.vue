<template>
    <g>
        <GameRectangle
            v-for="(rect, index) in rectRow.row"
            :key="index"
            :col-index="index"
            :rect="rect"
            :row-index="rowIndex"
            :stop-game="stopGame"
        />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import GameRectangle from "~/components/GameRectangle.vue";
import { RectRow } from "~/types/gameBoard";

@Component({
    components: { GameRectangle },
})
export default class GamingRow extends Vue {
    @Prop() public rectRow!: RectRow;
    @Prop() public stopGame!: any;
    @Prop() public rowIndex!: number;
}
</script>

<style scoped></style>
