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
                <div class="mt-4 text-lg w-full">
                    Bei diesem Spiel fahren Bilder von oben nach untern
                    herunter. Pro Reihe gibt es jeweils eine richtiges Bild, das
                    angeklickt werden muss.
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
                <div class="h-20 w-20 mt-8">
                    <img
                        :src="correctImage"
                        alt="Image  you have to click to get points."
                    />
                </div>
                <div class="hint text-center">
                    Dies ist das korrekte Bild für die heutige Spielereunde!
                </div>
            </div>
            <div
                class="
                    text-lg
                    explanation-finish
                    text-center
                    mt-8
                    h-1/6
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div class="font-semibold">Spielende</div>
                <div class="text-base mt-2">
                    Beim Klick auf ein falsches Bild ist das Spiel vorbei.
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
                    link-to="/explanation-coupons"
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
