<template>
    <div>
        <svg height="428" width="282" class="border border-blue-600">
            <GameRectangle :rect="rect" />
            <GameRow :rect-row="rectRow" />
        </svg>

        <button @click="startGame" class="test-btn border border-black w-40">
            Test
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect, RectRow } from "~/types/interfaces/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";
import GameRow from "~/components/gameRow.vue";

const board = namespace("game-board");
@Component({
    components: { GameRow, Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rect!: Rect;

    @board.Mutation
    public moveRectDown!: (c: number) => void;

    @board.State
    public rectRow!: RectRow;

    /**
     *@describe Endless loop which moves a Rectangle to the bottom.
     */
    public startGame() {
        let c: number = 0;
        setInterval(() => {
            this.moveRectDown(c);
            c += 1;
        }, 30);
    }
}
</script>
