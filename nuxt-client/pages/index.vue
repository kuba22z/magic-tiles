<template>
    <div>
        <div class="p-4 flex flex-col h-screen justify-center items-center">
            <div
                class="
                    explanation-top
                    flex flex-col
                    justify-center
                    w-full
                    text-center
                "
            >
                <div class="title text-xl font-semibold">magic-tiles</div>
                <div class="mt-4 text-lg w-full">
                    Bei diesem Spiel fahren Bilder von oben nach untern
                    herunter. Pro Reihe gibt es jeweils eine richtiges Bild, das
                    angeklickt werden muss.
                </div>
            </div>
            <div
                class="
                    flex flex-col
                    justify-center
                    items-center
                    logo-and-hint
                    mt-4
                    w-full
                "
            >
                <div
                    class="
                        flex
                        justify-center
                        items-center
                        text-center
                        h-20
                        w-20
                        mt-8
                    "
                >
                    <img
                        :src="correctImage"
                        alt="Image  you have to click to get points."
                    />
                </div>
                <div class="hint text-center">
                    Dies ist das korrekte Bild für die heutige Spielereunde!
                </div>
                <div class="text-lg explanation-finish text-center mt-8">
                    <div class="font-semibold">Spielende</div>
                    <div class="text-base">
                        Beim Klick auf ein falsches Bild ist das Spiel vorbei.
                    </div>
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
