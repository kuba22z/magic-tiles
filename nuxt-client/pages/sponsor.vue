<template>
    <div>
        <div class="p-4 flex flex-col h-full justify-start items-center">
            <div class="flex flex-col justify-center items-center">
                <div class="caption">Dieses Spiel wird gesponsort von</div>
                <div class="sponsor mt-2 text-3xl font-bold text-center">
                    {{ sponsorName }}
                </div>
                <div
                    class="
                        sponsor-image
                        w-10/12
                        h-auto
                        mt-2
                        items-center
                        flex
                        justify-center
                    "
                >
                    <img :src="sponsorImage" alt="Bild des Sponsors" />
                </div>
                <div class="sponsor-description text-center italic mt-6">
                    {{ sponsorDescription }}
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
                    link-to="/explanation-timer"
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
    get sponsorName(): string {
        return gameInfoStore.getCurrentSponsor;
    }

    get sponsorDescription(): string {
        return gameInfoStore.getCurrentSponsorDescription;
    }

    get sponsorImage(): string {
        const sponsorImage = gameInfoStore.getCurrentSponsorImage;
        if (sponsorImage === "no sponsor image was given.") {
            return require("@/assets/sponsorBigImage.svg");
        }
        return gameInfoStore.getCurrentSponsorImage;
    }
}
</script>

<style scoped></style>
