<template>
    <div>
        <div
            class="score-board flex flex-col justify-center pl-4 pr-4 border border-red-300 w-full"
        >
            <div
                class="highscore border border-red-300 h-12 flex justify-center items-center"
            >
                <div class="highscore-label border border-red-300 w-6/12 flex">
                    Highscore:
                </div>
                <div class="highscore-result border border-red-300 w-6/12 flex">
                    {{ getHighscore }}
                </div>
            </div>

            <div
                class="score border border-red-300 h-12 flex justify-center items-center"
            >
                <div class="score-label border border-red-300 w-6/12 flex">
                    Punktestand:
                </div>
                <div class="score-result border border-red-300 w-6/12 flex">
                    {{ getScore }}
                </div>
            </div>
            <div
                class="game-board border border-red-300 flex justify-center items-center"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ScoreBoard } from "~/types/gaming-screen";

const gaming = namespace("gaming-screen");
@Component
export default class gamingScreen extends Vue {
    public localData: object = {};
    @gaming.State
    public scoreBoard!: ScoreBoard;

    @gaming.Getter("getScoreBoard")
    public getScoreBoard!: ScoreBoard;

    @gaming.Getter("getHighscore")
    public getHighscore!: number;

    @gaming.Getter("getScore")
    public getScore!: number;
}
</script>

<style scoped></style>
