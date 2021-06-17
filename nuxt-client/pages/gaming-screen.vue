<template>
    <div
        class="
            gaming-screen-content
            flex flex-col
            justify-center
            items-center
            border border-red-300
            w-full
        "
        style="height: 100vh"
    >
        <GameHeader />

        <div
            class="game-board flex justify-center items-center h-full"
            style="width: 85%"
        >
            <GameBoard :run-game="runGame"></GameBoard>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Prop } from "nuxt-property-decorator";
import CountdownTimerWrapper from "~/components/CountdownTimerWrapper.vue";
import gameBoard from "~/components/gameBoard.vue";
import magicTilesButton from "~/components/MagicTilesButton.vue";
import GameHeader from "~/components/GameHeader.vue";

@Component({
    name: "gamingScreen",
    components: {
        gameBoard,
        CountdownTimerWrapper,
        magicTilesButton,
        GameHeader,
    },
})
export default class GamingScreen extends Vue {
    /**
     * @description determines whether the game starts
     */
    @Prop({ default: "true" }) public runGame!: string;
}
</script>

<style scoped></style>
