<template>
    <div
        class="
            header
            flex
            items-center
            border border-black-300
            w-full
            bg-backtostreet-blue
        "
        style="height: 20%"
    >
        <div class="timer-test px-2">
            <CountdownTimerWrapper />
        </div>
        <div
            class="scorePoints flex flex-col border border-red-300"
            style="width: 41%"
        >
            <div class="highscore border border-red-300 flex py-1.5">
                <HeaderLine :text="'Highscore:' + scoreBoard.highscore" />
            </div>

            <div class="score border border-red-300 flex">
                <HeaderLine :text="'Punktestand:' + scoreBoard.score" />
            </div>
        </div>
        <div
            class="
                score
                border border-red-300
                h-full
                flex flex-col
                items-center
                ml-auto
            "
            style="width: 35%"
        >
            <div
                class="
                    backToStreet
                    h-1/4
                    border border-red-300
                    bg-red-500
                    ml-auto
                "
                style="font-size: small"
            >
                BACK 2 STREET
            </div>

            <div
                class="
                    border-solid border-red border-2
                    bg-white
                    h-2/5
                    w-2/3
                    mt-4
                    flex
                "
                style="border-radius: 0.4rem"
            >
                <img :src="correctImage" alt="Fehler" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ScoreBoard } from "~/types/scoreBoard";
import CountdownTimerWrapper from "~/components/CountdownTimerWrapper.vue";
import HeaderLine from "~/components/HeaderLine.vue";
import { gameInfoStore } from "~/store";
const gaming = namespace("gaming-screen");

@Component({
    name: "GameHeader",
    components: {
        CountdownTimerWrapper,
        HeaderLine,
    },
})
export default class gameHeader extends Vue {
    @gaming.State
    public scoreBoard!: ScoreBoard;

    get correctImage(): string {
        return gameInfoStore.getCorrectImage;
    }
}
</script>

<style scoped></style>
