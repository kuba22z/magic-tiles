<template>
    <svg :x="rect.x + '%'" :y="rect.y + '%'" @click.stop="checkCorrectRect">
        <rect :fill="rect.color" height="25%" width="25%" />
        <!--    TODO(jakub) BUG: on firefox some images flicker between cook-book.svg and book.svg -->
        <!--    BUG: :href="rect.images" doesnt work properly same bug as with magic tiles button   -->
        <image :href="rect.image" height="25%" width="25%" />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, namespace } from "nuxt-property-decorator";
import { Rect } from "~/types/game-board";
import { SoundUtils } from "~/utils/soundUtils";
import { gameInfoStore, gamingScreenStore } from "~/store";

const board = namespace("game-board");

@Component
export default class gamingRectangle extends Vue {
    @Prop() public rect!: Rect;

    @Prop() public colIndex!: number;

    @Prop() public rowIndex!: number;

    @Prop() public stopGame!: any;

    @board.Mutation
    public setColor!: (colorAndIndexes: [string, number, number]) => void;

    @board.Mutation
    public setIsClicked!: (rectIndexes: [number, number]) => void;

    /**
     * @description Check whether the correct rect was clicked if yes increment
     * score and set rect as clicked otherwise Game End
     */
    checkCorrectRect() {
        if (this.rect.isClicked) return;

        this.setIsClicked([this.rowIndex, this.colIndex]);
        if (this.rect.image === gameInfoStore.getCorrectImage) {
            gamingScreenStore.incrementScore();
            this.setColor(["green", this.rowIndex, this.colIndex]);
            SoundUtils.playCorrectSound();
        } else {
            this.stopGame();
            this.setColor(["red", this.rowIndex, this.colIndex]);
            SoundUtils.playGameOverSound();
        }
    }
}
</script>

<style scoped></style>
