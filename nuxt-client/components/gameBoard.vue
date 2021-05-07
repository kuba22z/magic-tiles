<template>
    <div>
        <svg height="426" width="282" class="border border-blue-600">
            <GameRow v-for="rectRow in rectBoard.array" :rect-row="rectRow" />
        </svg>

        <button class="test-btn border border-black w-40" @click="startGame">
            Test
        </button>
        <button class="test-btn border border-black w-20" @click="stopGame">
            Stop
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";
import GameRow from "~/components/gameRow.vue";
let i = 0;
let stepSize = 2.5,
    bigStep = 25 / stepSize;
let start_ref: number;
let timer: any;

const board = namespace("game-board");
@Component({
    components: { GameRow, Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rectBoard!: RectArray<RectArray<Rect>>;

    @board.Mutation
    public moveRectRowDown!: (stepSize: number) => void;

    @board.Mutation
    public pushFrontAndPop!: () => void;

    /**
     *@describe Endless loop which move all RectRow to the bottom
     * and creates new rectRows at the top
     */
    public startGame() {
        timer = setTimeout(() => {
            start_ref = requestAnimationFrame(this.startGame);
        }, 25);
        this.moveRectRowDown(stepSize);
        i++;
        if (i === bigStep) {
            this.pushFrontAndPop();
            i = 0;
        }
    }

    /**
     * @describe stop the game
     */
    public stopGame() {
        cancelAnimationFrame(start_ref);
        clearTimeout(timer);
    }
}
</script>
