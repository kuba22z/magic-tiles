<template>
    <div>
        <div class="p-4 flex flex-col h-screen justify-start items-center">
            <div
                class="
                    h-12
                    game-title
                    text-lg
                    flex
                    justify-center
                    items-center
                    font-semibold
                "
            >
                Zeitliche Begrenzung
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
                    Sobald du mit dem Spielen beginnst, wirst du links oben
                    einen Timer sehen. Das ist deine Spielzeit. Sobald der Timer
                    auf 0:00 steht, wird dein Highscore automatisch abgeschickt.
                </div>
            </div>
            <div
                class="
                    text-lg
                    explanation-finish
                    text-center
                    mt-8
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div class="font-semibold">Spielende</div>
                <div class="text-base mt-2">
                    Bei einem Klick auf ein falsches Bild wird dein aktueller
                    Score wieder auf 0 gesetzt und das Spiel startet von vorne.
                    Dein Highscore bleibt jedoch für die gesamte Sitzung
                    bestehen.
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
                    text="Zurück"
                    button-type="nuxtlink"
                    link-to="/"
                />
                <MagicTilesButton
                    text="Weiter"
                    link-to="/sponsor"
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
