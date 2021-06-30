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
        <div class="scorePoints flex flex-col" style="width: 40%">
            <div class="highscore flex mb-1.5">
                <HeaderLine :text="'Highscore: ' + sessionHighscore" />
            </div>

            <div class="score flex">
                <HeaderLine :text="'Punktestand: ' + score" />
            </div>
        </div>
        <div
            class="score h-full flex flex-col items-center ml-auto"
            style="width: 35%"
        >
            <div
                class="backToStreet logo h-1/4 mt-2 ml-auto font-bold"
                style="font-size: small; width: 100%"
            >
                <a href="https://back2street.de">
                    <img
                        src="../assets/back2street-logo.svg"
                        alt="Back2street logo"
                        class="object-fit h-full w-full"
                    />
                </a>
            </div>

            <div
                class="
                    border-solid border-red border-2
                    correct-image
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

    get sessionHighscore() {
        return gamingScreenStore.getSessionHighscore;
    }
}
</script>

<style scoped></style>
