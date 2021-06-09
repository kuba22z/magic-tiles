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
        <button class="test-btn border border-black w-20" @click="pauseGame">
            Stop
        </button>
        <div class="countDown">
            {{ countDownForGameStart }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from "nuxt-property-decorator";
import GameRectangle from "~/components/gameRectangle.vue";
import GameRow from "~/components/gameRow.vue";
import { RectBoard } from "~/types/game-board";
import { ScoreBoard } from "~/types/scoreBoard";
import { playGameOverSound } from "~/assets/sounds";

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

    @gaming.Mutation
    public setScore!: (newScore: number) => void;

    @gaming.State
    public scoreBoard!: ScoreBoard;

    /**
     * @description determines whether the game starts
     */
    @Prop({ default: "true" }) public runGame!: string;

    miniStep: number = 0;
    readonly stepSize: number = 1;
    readonly bigStep: number = 25 / this.stepSize;
    gameTimerRef: any;
    countDownTimerRef: any;
    delay: number = 30;
    currentLevel: number = 0;
    // for test reasons: Level up in steps of 5
    scoreLevels: number[] = [5, 10, 15, 20, 25];
    countDownForGameStart: number = 3;

    /**
     * @description runs the countdown for game start if the prop
     * runGame is true, initialize rectBoard with 5 RectRows above the
     * playing field and calls after the countDown startGame()
     */
    mounted() {
        if (this.runGame === "true") {
            this.setScore(0);
            this.initRectBoard();
            this.countDownTimerRef = setInterval(() => {
                this.decrementCurrentTime();
                if (this.countDownForGameStart === 0) {
                    clearInterval(this.countDownTimerRef);
                    this.startGame();
                }
            }, 1000);
        }
    }

    /**
     * @description decrement countDownForGameStart
     */
    decrementCurrentTime() {
        this.countDownForGameStart--;
    }

    /**
     * @description starts the game, calls moveRectRowUntilBottom(),
     * and moveRectRowUntilBottom() calls mainGameLoop
     */
    public startGame() {
        this.moveRectRowUntilBottom();
    }

    /**
     * @description move down all RectRow until the last RectRow
     * is at the bottom, then it stops the loop and calls mainGameLoop()
     */
    public moveRectRowUntilBottom() {
        this.gameTimerRef = setInterval(() => {
            this.moveRectRowDown(this.stepSize);
            this.miniStep++;
            if (this.miniStep === this.bigStep * 4) {
                this.miniStep = 0;
                clearInterval(this.gameTimerRef);
                this.mainGameLoop();
            }
        }, this.delay);
    }

    /**
     *@description endless loop which move all RectRow to the bottom
     * and creates new rectRows at the top
     */
    public mainGameLoop() {
        this.gameTimerRef = setInterval(() => {
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
                    this.pauseGame();
                    this.mainGameLoop();
                }
            }
        }, this.delay);
    }

    /**
     * @description pause the game
     */
    public pauseGame() {
        clearInterval(this.gameTimerRef);
    }

    /**
     * @description stop the game, play sound for game over and
     * redirect to score-screen
     */
    public stopGame() {
        this.pauseGame();
        playGameOverSound();
        this.redirectToScoreScreen();
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
            this.stopGame();
    }

    /**
     * @description decrement delay for a faster game and set next level
     * @param speedUp determines how much delay gets smaller
     */
    public levelUp(speedUp: number) {
        this.delay -= speedUp;
        this.currentLevel++;
    }

    /**
     * @description redirect to score-screen
     */
    public redirectToScoreScreen() {
        this.$router.push({
            path: "/score-screen",
        });
    }
}
</script>
