<template>
    <div>
        <svg height="426" width="282" class="border border-blue-600">
            <GameRow
                v-for="(rectRow, index) in rectBoard.board"
                :key="index"
                :row-index="index"
                :rect-row="rectRow"
                :stop-game="stopGame"
            />
        </svg>

        <button
            class="test-btn border border-black w-40"
            @click="moveRectRowUntilBottom"
        >
            Start
        </button>
        <button class="test-btn border border-black w-20" @click="stopGame">
            Stop
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
import GameRectangle from "~/components/gameRectangle.vue";
import GameRow from "~/components/gameRow.vue";
import { RectBoard } from "~/types/game-board";
import { ScoreBoard } from "~/types/scoreBoard";
import { SoundUtils } from "~/utils/soundUtils";

const board = namespace("game-board");
const gaming = namespace("gaming-screen");

@Component({
    components: { GameRow, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rectBoard!: RectBoard;

    @board.Mutation
    public initRectBoard!: () => void;

    @board.Mutation
    public moveRectRowDown!: (stepSize: number) => void;

    @board.Mutation
    public pushFrontAndPop!: () => void;

    @gaming.State
    public scoreBoard!: ScoreBoard;

    miniStep: number = 0;
    readonly stepSize: number = 1;
    readonly bigStep: number = 25 / this.stepSize;
    timerRef: any;
    delay: number = 30;
    currentLevel: number = 0;
    // for test reasons: Level up in steps of 5
    scoreLevels: number[] = [5, 10, 15, 20, 25];

    /**
     * @description initialize rectBoard with 5 RectRows above the
     * playing field and move down all RectRow until the last RectRow
     * is at the bottom, then it stops the loop and calls startGame()
     */
    public moveRectRowUntilBottom() {
        this.initRectBoard();
        this.timerRef = setInterval(() => {
            this.moveRectRowDown(this.stepSize);
            this.miniStep++;
            if (this.miniStep === this.bigStep * 4) {
                this.miniStep = 0;
                clearInterval(this.timerRef);
                this.startGame();
            }
        }, this.delay);
    }

    /**
     *@description endless loop which move all RectRow to the bottom
     * and creates new rectRows at the top
     */
    public startGame() {
        this.timerRef = setInterval(() => {
            this.moveRectRowDown(this.stepSize);
            this.miniStep++;
            if (this.miniStep === this.bigStep) {
                this.checkGameEnd();
                this.pushFrontAndPop();
                this.miniStep = 0;
                if (
                    this.scoreBoard.score >
                        this.scoreLevels[this.currentLevel] &&
                    this.delay > 0
                ) {
                    this.levelUp(4);
                    // necessary so that setInterval notices the change of delay
                    this.stopGame();
                    this.startGame();
                }
            }
        }, this.delay);
    }

    /**
     * @description stop the game
     */
    public stopGame() {
        clearInterval(this.timerRef);
    }

    /**
     * @description stop the game and play sound for game over
     */
    public gameOver() {
        this.stopGame();
        SoundUtils.playGameOverSound();
    }

    /**
     * @description check if a Rectangle was clicked in the last RectRow if no -> game end
     */
    public checkGameEnd() {
        if (
            !(
                this.rectBoard.board[4].row[0].isClicked ||
                this.rectBoard.board[4].row[1].isClicked ||
                this.rectBoard.board[4].row[2].isClicked ||
                this.rectBoard.board[4].row[3].isClicked
            )
        )
            this.gameOver();
    }

    /**
     * @description decrement delay for a faster game and set next level
     * @param speedUp determines how much delay gets smaller
     */
    public levelUp(speedUp: number) {
        this.delay -= speedUp;
        this.currentLevel++;
    }
}
</script>
