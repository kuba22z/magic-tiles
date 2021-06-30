<template>
    <svg
        class="border-l-2 border-r-2 border-backtostreet-blue"
        style="width: 100%; height: 100%"
    >
        <GameRow
            v-for="(rectRow, index) in rectBoard.board"
            :key="index"
            :row-index="index"
            :rect-row="rectRow"
            :stop-game="stopGame"
        />
        <g v-show="showCountdown">
            <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="black"
                stroke-width="3"
                fill="white"
            />
            <text
                class="countDownText font-extrabold text-backtostreet-blue"
                x="50%"
                y="50%"
                text-anchor="middle"
                stroke-width="2px"
                font-size="40"
                dy=".3em"
                font-family="Amatic SC"
            >
                {{ countDownForGameStart }}
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from "nuxt-property-decorator";
import GameRectangle from "~/components/GameRectangle.vue";
import GameRow from "~/components/GameRow.vue";
import { RectBoard } from "~/types/gameBoard";
import { SoundUtils } from "~/utils/soundUtils";
import { gamingScreenStore, gameInfoStore } from "~/store";

const board = namespace("gameBoard");

@Component({
    components: { GameRow, GameRectangle },
})
export default class GamingBoard extends Vue {
    @board.State
    public rectBoard!: RectBoard;

    @board.Mutation
    public initRectBoard!: () => void;

    @board.Mutation
    public moveRectRowDown!: (stepSize: number) => void;

    @board.Mutation
    public pushFrontAndPop!: () => void;

    /**
     * @description determines whether the game starts
     */
    @Prop({ default: "true" }) public runGame!: string;

    miniStep: number = 0;
    readonly stepSize: number = 1;
    readonly bigStep: number = 25 / this.stepSize;
    gameTimerRef: any;
    countDownTimerRef: any;
    delay: number = 28;
    currentLevel: number = 0;
    scoreLevels: number[] = [];
    // Level up in steps of 1Level:10, 2Level: 25, 3Level: 50, 4Level: 100, Level5: 150
    levelUpSteps: number[] = [10, 25, 50, 100, 150];
    countDownForGameStart: number = 3;
    showCountdown: boolean = true;

    /**
     * @description runs the countdown for game start if the prop
     * runGame is true, initialize rectBoard with 5 RectRows above the
     * playing field and calls after the countDown startGame()
     */
    mounted() {
        if (this.runGame === "true") {
            this.computeScoreLevels();
            gamingScreenStore.setScore(0);
            this.initRectBoard();
            this.countDownTimerRef = setInterval(() => {
                this.decrementCurrentTime();
                if (this.countDownForGameStart === 0) {
                    clearInterval(this.countDownTimerRef);
                    this.showCountdown = false;
                    this.startGame();
                }
            }, 1000);
        }
        // makes sure that we stop the game once our play time hit the end value
        // (0:00). Event is bubbled up from countdownTimer.vue component.
        this.$nuxt.$on("countdownTimerStopped", () => this.endGame());
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
                    this.score > this.scoreLevels[this.currentLevel] &&
                    this.delay > 0
                ) {
                    this.levelUp(3);
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
        SoundUtils.playGameOverSound();
        this.redirectTo("/score-screen");
    }

    /**
     * @description Gets called when the timer hit it's end value (0:00).
     * Ends the game. Redirects to result-screen.
     */
    public endGame() {
        this.pauseGame();
        SoundUtils.playGameOverSound();
        this.redirectTo("/result-screen");
    }

    /**
     * @description compute score level they determine from which score there is a new level
     */
    public computeScoreLevels() {
        const maxLevel = gameInfoStore.getGameMaxLevel;
        for (let level = 1; level <= maxLevel; level++) {
            if (level > 5) return;
            this.scoreLevels.push(this.levelUpSteps[level - 1]);
        }
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
     * @description redirects to given path
     */
    public redirectTo(page: string) {
        this.$router.push({
            path: page,
        });
    }

    get score(): number {
        return gamingScreenStore.getScore;
    }

    get sessionHighscore(): number {
        return gamingScreenStore.getSessionHighscore;
    }
}
</script>
<style scoped></style>
