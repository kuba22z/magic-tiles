<template>
    <div>
        <div
            class="
                score-screen
                flex flex-col
                border border-green-300
                w-full
                absolute
                h-full
                bg-gray-500 bg-opacity-90
            "
        >
            <div
                class="
                    score-screen-content
                    flex flex-col
                    justify-center
                    self-center
                    h-full
                    w-4/5
                "
            >
                <div
                    class="
                        coupon-result
                        h-1/4
                        flex
                        text-center
                        bg-white
                        relative
                    "
                    style="bottom: 11%; border-radius: 0.4rem"
                >
                    <div class="mt-4 text-xl w-full px-4">
                        Versuchen Sie es erneut oder schicken Sie das beste
                        Ergebnis ab
                    </div>
                </div>
                <div
                    class="
                        sessionHighscore
                        w-3/4
                        self-center
                        flex flex-col
                        relative
                        items-center
                        text-xl
                        bg-white
                    "
                    style="top: 2%; border-radius: 0.4rem"
                >
                    Highscore: {{ sessionHighscore }}
                </div>
                <div
                    class="
                        score-result
                        w-3/4
                        self-center
                        flex flex-col
                        relative
                        items-center
                        text-xl
                        bg-white
                    "
                    style="top: 5%; border-radius: 0.4rem"
                >
                    Punktestand: {{ score }}
                </div>
                <div
                    class="
                        button-container
                        flex flex-col
                        w-3/4
                        self-center
                        relative
                    "
                    style="top: 10%"
                >
                    <div class="flex flex-col self-center mt-4">
                        <magic-tiles-button
                            text="Highscore abschicken!"
                            button-type="nuxtlink"
                            link-to="/result-screen"
                        ></magic-tiles-button>
                    </div>
                    <div class="flex flex-col self-center mt-6">
                        <magic-tiles-button
                            text="Nochmal Spielen!"
                            button-type="nuxtlink"
                            link-to="/gaming-screen"
                        ></magic-tiles-button>
                    </div>
                </div>
            </div>
            <div
                class="gaming-screen flex flex-col w-full absolute"
                style="z-index: -1"
            >
                <gaming-screen run-game="false"></gaming-screen>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gamingScreenStore } from "~/store";
import magicTilesButton from "~/components/MagicTilesButton.vue";
import GamingScreen from "~/pages/gaming-screen.vue";

@Component({
    name: "scoreScreen",
    layout: "blank",
    components: {
        GamingScreen,
        magicTilesButton,
    },
})
export default class scoreScreen extends Vue {
    get score() {
        return gamingScreenStore.getScore;
    }

    get sessionHighscore() {
        return gamingScreenStore.getSessionHighscore;
    }
}
</script>

<style scoped></style>
