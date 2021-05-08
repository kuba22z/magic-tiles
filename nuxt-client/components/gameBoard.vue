<template>
    <div>
        <svg height="426" width="282" class="border border-blue-600">
            <GameRow
                v-for="(rectRow, index) in rectBoard.board"
                :key="index"
                :rect-row="rectRow"
            />
        </svg>

        <button class="test-btn border border-black w-40" @click="startGame">
            Speed Up
        </button>
        <button class="test-btn border border-black w-20" @click="stopGame">
            Stop
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";
import GameRow from "~/components/gameRow.vue";
import { RectBoard } from "~/types/game-board";

const board = namespace("game-board");
@Component({
    components: { GameRow, Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rectBoard!: RectBoard;

    @board.Mutation
    public moveRectRowDown!: (stepSize: number) => void;

    @board.Mutation
    public pushFrontAndPop!: () => void;

    i: number = 0;
    readonly stepSize: number = 1;
    readonly bigStep: number = 25 / this.stepSize;
    startRef: number = 0;
    timerRef: any;

    /**
     *@describe Endless loop which move all RectRow to the bottom
     * and creates new rectRows at the top
     */
    public startGame() {
        this.timerRef = setTimeout(() => {
            this.startRef = requestAnimationFrame(this.startGame);
        }, 25);
        this.moveRectRowDown(this.stepSize);
        this.i++;
        if (this.i === this.bigStep) {
            this.pushFrontAndPop();
            this.i = 0;
        }
    }

    /**
     * @describe stop the game
     */
    public stopGame() {
        cancelAnimationFrame(this.startRef);
        clearTimeout(this.timerRef);
    }
}
</script>
