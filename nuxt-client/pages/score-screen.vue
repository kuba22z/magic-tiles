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
                    border border-red-300
                    justify-center
                    self-center
                    h-full
                    w-4/5
                "
            >
                <div
                    class="
                        coupon-result
                        border border-red-300
                        h-1/4
                        flex
                        text-center
                        bg-gray-500
                        relative
                    "
                    style="bottom: 11%"
                >
                    <div class="mt-4 text-xl w-full px-4">
                        Es haben 30 Punkte gefehlt für den 10% Gutschein
                        gefehlt!
                    </div>
                </div>
                <div
                    class="
                        score-result
                        border border-red-300
                        w-full
                        flex flex-col
                        relative
                        items-center
                        text-xl
                    "
                    style="top: 5%"
                >
                    Score: {{ score }}
                </div>
                <div
                    class="
                        button-container
                        flex flex-col
                        w-3/4
                        border border-red-300
                        justify-center
                        self-center
                        relative
                    "
                    style="top: 10%"
                >
                    <div class="flex flex-col self-center mt-4 w-5/6">
                        <magic-tiles-button
                            text="Highscore abschicken!"
                            button-type="nuxtlink"
                            link-to="/result-screen"
                        ></magic-tiles-button>
                    </div>
                    <div class="flex flex-col mt-6">
                        <magic-tiles-button
                            text="Nochmal Spielen!"
                            button-type="nuxtlink"
                            link-to="/gaming-screen"
                        ></magic-tiles-button>
                    </div>
                </div>
            </div>
            <div
                class="
                    gaming-screen
                    flex flex-col
                    border border-red-300
                    w-full
                    absolute
                "
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
import magicTilesButton from "~/components/magicTilesButton.vue";
import GamingScreen from "~/pages/gaming-screen.vue";

@Component({
    name: "scoreScreen",
    components: {
        GamingScreen,
        magicTilesButton,
    },
})
export default class scoreScreen extends Vue {
    get score() {
        return gamingScreenStore.getScore;
    }
}
</script>

<style scoped></style>
