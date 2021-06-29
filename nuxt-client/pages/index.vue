<template>
    <div>
        <div class="p-4 flex flex-col h-screen justify-start items-center">
            <div
                class="
                    h-12
                    game-title
                    text-xl
                    flex
                    justify-center
                    items-center
                    font-semibold
                "
            >
                magic-tiles
            </div>
            <div
                class="
                    explanation-top
                    flex flex-col
                    justify-center
                    w-full
                    text-center
                "
            >
                <div class="mt-4 w-full">
                    Bei diesem Spiel fahren Kacheln mit Bildern von oben nach
                    unten herunter. Pro Reihe gibt es jeweils ein richtiges
                    Bild, das angeklickt werden muss.
                </div>
            </div>
            <div
                class="
                    logo-and-hint
                    mt-4
                    w-full
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div class="h-20 w-20 mt-2 items-center flex justify-center">
                    <img
                        :src="correctImage"
                        alt="Image  you have to click to get points."
                    />
                </div>
                <div class="hint text-center">
                    Das ist das korrekte Bild für die heutige Spielrunde!
                </div>
            </div>
            <div
                class="
                    explanation-finish
                    text-center
                    mt-8
                    h-1/6
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div class="font-semibold text-lg">Score</div>
                <div class="mt-2">
                    Pro Klick auf eine Kachel mit dem richtigen Bild erhöht sich
                    dein Score. Je höher dein Highscore, desto höher ist deine
                    Chance auf einen tollen Gewinn!
                </div>
            </div>
            <div
                class="
                    bottom-navigation-buttons
                    flex
                    mt-4
                    justify-center
                    items-end
                    align-bottom
                    w-full
                    h-full
                    space-x-2
                "
            >
                <MagicTilesButton
                    text="Back to street!"
                    button-type="href"
                    link-to="https://back2street.de"
                />
                <MagicTilesButton
                    text="Weiter"
                    link-to="/explanation-timer"
                    button-type="nuxtlink"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MagicTilesButton from "~/components/MagicTilesButton.vue";
import { gameInfoStore } from "~/store";

@Component({
    name: "GameStartPage",
    layout: "gaming",
    components: {
        MagicTilesButton,
    },
})
export default class GameStartPage extends Vue {
    get correctImage(): string {
        return gameInfoStore.getCorrectImage;
    }
}
</script>

<style scoped></style>
