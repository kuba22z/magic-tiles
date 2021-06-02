<template>
    <svg :x="rect.x + '%'" :y="rect.y + '%'" @click="checkCorrectRect">
        <rect :fill="rect.color" height="25%" width="25%" />
        <!--    TODO(jakub) BUG: on firefox some images flicker between cook-book.svg and book.svg -->
        <!--    BUG: :href="rect.images" doesnt work properly same bug as with magic tiles button   -->
        <image
            v-if="rect.image === 'book.svg'"
            href="~/assets/book.svg"
            height="25%"
            width="25%"
        />
        <image
            v-else-if="rect.image === 'cook-book.svg'"
            href="~/assets/cook-book.svg"
            height="25%"
            width="25%"
        />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, namespace } from "nuxt-property-decorator";
import { useSound } from "@vueuse/sound";
import guitar from "../assets/acute.mp3";
import { Rect } from "~/types/game-board";
const gaming = namespace("gaming-screen");
const board = namespace("game-board");

@Component
export default class gamingRectangle extends Vue {
    @Prop() public rect!: Rect;

    @Prop() public colIndex!: number;

    @Prop() public rowIndex!: number;

    @Prop() public stopGame!: any;

    @gaming.Mutation
    public incrementScore!: () => void;

    @board.Mutation
    public setColor!: (colorAndIndexes: [string, number, number]) => void;

    @board.Mutation
    public setIsClicked!: (rectIndexes: [number, number]) => void;

    setup() {
        const { play, stop } = useSound(guitar);
        return {
            play,
            stop,
        };
    }

    /**
     * @description Check whether the correct rect was clicked if yes increment
     * score and set rect as clicked otherwise Game End
     */
    checkCorrectRect() {
        if (!this.rect.isClicked) {
            this.setIsClicked([this.rowIndex, this.colIndex]);
            if (this.rect.image === "book.svg") {
                this.incrementScore();
                this.setColor(["green", this.rowIndex, this.colIndex]);
                this.setup().play();
            } else {
                this.stopGame();
                this.setColor(["red", this.rowIndex, this.colIndex]);
            }
        }
    }
}
</script>

<style scoped></style>
