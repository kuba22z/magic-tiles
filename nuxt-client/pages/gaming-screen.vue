<template>
    <div>
        <div
            class="
                score-board
                flex flex-col
                justify-center
                pl-4
                pr-4
                border border-red-300
                w-full
            "
        >
            <div class="timer-test">
                <CountdownTimerWrapper />
            </div>
            <div
                class="
                    highscore
                    border border-red-300
                    h-12
                    flex
                    justify-center
                    items-center
                "
            >
                <div class="highscore-label border border-red-300 w-6/12 flex">
                    Highscore:
                </div>
                <div class="highscore-result border border-red-300 w-6/12 flex">
                    {{ scoreBoard.highscore }}
                </div>
            </div>

            <div
                class="
                    score
                    border border-red-300
                    h-12
                    flex
                    justify-center
                    items-center
                "
            >
                <div class="score-label border border-red-300 w-6/12 flex">
                    Punktestand:
                </div>
                <div class="score-result border border-red-300 w-6/12 flex">
                    {{ scoreBoard.score }}
                </div>
            </div>
            <div
                class="
                    game-board
                    border border-red-300
                    flex
                    justify-center
                    items-center
                "
            >
                <GameBoard />
            </div>
        </div>
        <!-- TODO(pierre): maybe keep these. just keep them for debugging purposes right now. -->
        <div
            class="
                bottom-navigation-buttons
                flex flex-col
                justify-center
                mt-10
                items-center
                border border-red-300
                w-full
            "
        >
            <div
                class="
                    back-button
                    mt-6
                    border border-red-300
                    h-12
                    w-39
                    flex
                    justify-center
                    items-center
                    text-center
                "
            >
                <MagicTilesButton
                    text="Zurück"
                    link-to="/explanation-coupons"
                    button-type="nuxtlink"
                    color="green"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ScoreBoard } from "~/types/scoreBoard";
import CountdownTimerWrapper from "~/components/CountdownTimerWrapper.vue";

const gaming = namespace("gaming-screen");
@Component({
    name: "GamingScreen",
    components: {
        CountdownTimerWrapper,
    },
})
export default class GamingScreen extends Vue {
    @gaming.State
    public scoreBoard!: ScoreBoard;
}
</script>

<style scoped></style>
