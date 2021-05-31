<template>
    <div>
        <div class="flex flex-col justify-center items-center">
            <div
                class="explanation-top flex flex-col justify-center mt-2 w-full text-center"
            >
                <div class="title text-2xl w-full">magic tiles</div>
                <div class="mt-4 text-xl w-full px-4">
                    Bei diesem Spiel fahren die Kacheln von oben nach untern
                    herunter. Pro Reihe gibt es jeweils eine richtige Kachel,
                    die angeklickt werden muss.
                </div>
            </div>
            <div
                class="flex flex-col justify-center items-center logo-and-hint mt-4 w-full"
            >
                <div
                    class="flex justify-center items-center text-center h-20 w-20 bg-green-300 mt-4"
                >
                    <img
                        :src="correctImage"
                        alt="Image  you have to click to get points."
                    />
                </div>
                <div class="hint text-center">
                    Dies ist die korrekte Kachel für die heutige Spielereunde!
                </div>
                <div class="text-lg explanation-finish text-center mt-4 px-4">
                    Pro Klick auf die richtige Kachel gibt es jeweils einen
                    Punkt. Beim Klick auf eine falsche Kachel ist das Spiel
                    vorbei.
                </div>
            </div>
            <div
                class="bottom-navigation-buttons flex items-center mt-4 justify-center w-full"
            >
                <div
                    class="flex items-center justify-center w-full buttons space-x-2 mb-6"
                >
                    <div
                        class="back-button h-12 w-36 flex justify-center items-center text-center"
                    >
                        <MagicTilesButton
                            text="back to street!"
                            button-type="href"
                            color="green"
                        />
                    </div>
                    <div
                        class="next-button h-12 w-36 flex justify-center items-center text-center"
                    >
                        <MagicTilesButton
                            text="Weiter"
                            link-to="/explanation-coupons"
                            button-type="nuxtlink"
                            color="green"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MagicTilesButton from "~/components/magicTilesButton.vue";
import { gameInfoStore } from "~/store";

@Component({
    name: "GameStartPage",
    components: {
        MagicTilesButton,
    },
})
export default class GameStartPage extends Vue {
    get correctImage(): string {
        console.log(gameInfoStore.getCorrectImage);
        return gameInfoStore.getCorrectImage;
    }
}
</script>

<style scoped></style>
