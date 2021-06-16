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
        <div class="timer-test px-2 flex">
            <CountdownTimerWrapper />
        </div>
        <div
            class="scorePoints flex flex-col border border-red-300"
            style="width: 40%"
        >
            <div class="highscore border border-red-300 flex mb-1.5">
                <HeaderLine :text="'Highscore: ' + highscore" />
            </div>

            <div class="score border border-red-300 flex">
                <HeaderLine :text="'Punktestand: ' + score" />
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
                    font-bold
                "
                style="font-size: small; width: 100%"
            >
                <a href="http://back2street.de"> BACK 2 STREET</a>
            </div>

            <div
                class="
                    border-solid border-red border-2
                    bg-white
                    h-2/5
                    mt-4
                    flex
                    justify-center
                "
                style="border-radius: 0.4rem; width: 60%; height: 45%"
            >
                <img :src="correctImage" alt="Fehler" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gamingScreenStore, gameInfoStore } from "~/store";
import CountdownTimerWrapper from "~/components/CountdownTimerWrapper.vue";
import HeaderLine from "~/components/HeaderLine.vue";

@Component({
    name: "GameHeader",
    components: {
        CountdownTimerWrapper,
        HeaderLine,
    },
})
export default class gameHeader extends Vue {
    get correctImage(): string {
        return gameInfoStore.getCorrectImage;
    }

    get score() {
        return gamingScreenStore.getScore;
    }

    get highscore() {
        return gamingScreenStore.getHighscore;
    }
}
</script>

<style scoped></style>
